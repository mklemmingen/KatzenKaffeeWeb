require('dotenv').config();
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

async function openDb() {
    const dbPath = process.env.DB_PATH || path.resolve(__dirname, '../../../server/_db/database.db');
    console.log(`Database path from .env: ${process.env.DB_PATH}`);
    console.log(`Resolved database path: ${dbPath}`);

    // Checking if the database file exists
    if (!fs.existsSync(dbPath)) {
        console.error(`Database file does not exist at path: ${dbPath}`);
        throw new Error('Database file not found');
    }

    return sqlite.open({
        filename: dbPath,
        driver: sqlite3.Database
    });
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