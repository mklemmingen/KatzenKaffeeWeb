require('dotenv').config();
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

async function openDb() {
    const dbPath = process.env.DB_PATH || path.resolve(__dirname, '../../../server/_db/database.db');
    console.log(`Database path from .env: ${process.env.DB_PATH}`);
    console.log(`Resolved database path: ${dbPath}`);

    // If the database file does not exist, create it
    if (!fs.existsSync(dbPath)) {
        console.warn(`Database file does not exist at path: ${dbPath}. Creating a new one.`);
        fs.writeFileSync(dbPath, '');
    }

    let db;
    try {
        db = await sqlite.open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        // Test if the database is corrupt by running a simple query
        await db.get('SELECT 1');
    } catch (error) {
        console.error('Database is corrupt. Recreating the database file.');
        fs.unlinkSync(dbPath);
        fs.writeFileSync(dbPath, '');
        db = await sqlite.open({
            filename: dbPath,
            driver: sqlite3.Database
        });
    }

    return db;
}

async function setup() {
    const db = await openDb();
    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS experiences (
                id INTEGER PRIMARY KEY,
                name TEXT,
                email TEXT,
                experience TEXT
            )
        `);
        console.log('Database setup completed successfully.');
    } catch (error) {
        console.error('Error setting up the database:', error);
    } finally {
        await db.close();
    }
}

async function selfCheck() {
    const db = await openDb();
    try {
        const result = await db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="experiences"');
        if (result) {
            console.log('Self-check passed: "experiences" table exists.');
        } else {
            console.log('Self-check failed: "experiences" table does not exist.');
        }
    } catch (error) {
        console.error('Error during self-check:', error);
    } finally {
        await db.close();
    }
}

setup().then(selfCheck);