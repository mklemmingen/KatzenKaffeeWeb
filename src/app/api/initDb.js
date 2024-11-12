import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function openDb() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}

async function setup() {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS experiences (id INTEGER PRIMARY KEY, experience TEXT)');
}

setup();