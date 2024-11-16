import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

async function openDb() {
    const dbPath = process.env.DB_PATH || path.resolve(__dirname, '../../../server/_db/database.db');
    console.log('Database path:', dbPath); // Logging the database path
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    });
}

export default async function handler(req, res) {
    console.log('API handler called'); // Log when the handler is called
    const db = await openDb();

    try {
        if (req.method === 'GET') {
            console.log('GET request received'); // Log for GET request
            const experiences = await db.all('SELECT * FROM experiences');
            res.status(200).json(experiences);
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await db.close();
    }
}