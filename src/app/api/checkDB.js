import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function openDb() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}

export default async function handler(req, res) {
    try {
        const db = await openDb();
        await db.get('SELECT 1');
        res.status(200).json({ message: 'Database is running' });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Database connection error' });
    }
}