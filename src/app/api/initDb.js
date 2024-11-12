const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function openDb() {
    return sqlite.open({
        filename: './db/database.db',
        driver: sqlite3.Database
    });
}

async function setup() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS experiences (
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT,
            experience TEXT
        )
    `);
}

setup();