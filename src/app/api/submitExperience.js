import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function openDb() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}

export default async function handler(req, res) {
    const db = await openDb();

    try {
        if (req.method === 'POST') {
            const { experience } = req.body;
            console.log('Received experience:', experience);
            await db.run('INSERT INTO experiences (experience) VALUES (?)', [experience]);
            res.status(201).json({ message: 'Experience submitted successfully' });
        } else if (req.method === 'GET') {
            const experiences = await db.all('SELECT * FROM experiences');
            res.status(200).json(experiences);
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}