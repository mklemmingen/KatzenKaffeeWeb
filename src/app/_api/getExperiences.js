import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function openDb() {
    return open({
        filename: './_db/database._db',
        driver: sqlite3.Database
    });
}

export default async function handler(req, res) {
    const db = await openDb();

    try {
        if (req.method === 'GET') {
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