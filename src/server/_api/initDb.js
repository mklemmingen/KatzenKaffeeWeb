require('dotenv').config();
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

async function openDb() {
    const dbPath = process.env.DB_PATH || path.resolve(__dirname, '../../_db/database.db');
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
    } catch (error) {
        console.error('Error setting up the database:', error);
    } finally {
        await db.close();
    }
}

setup();