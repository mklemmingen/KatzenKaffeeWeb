import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function openDb() {
    return open({
        filename: './db/database.db',
        driver: sqlite3.Database
    });
}

export default async function handler(req, res) {
    const db = await openDb();

    try {
        if (req.method === 'POST') {
            const { name, email, experience } = req.body;
            console.log('Received experience:', { name, email, experience });

            // timeout for the database operation
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Database operation timed out')), 5000)
            );

            const dbOperation = db.run(
                'INSERT INTO experiences (name, email, experience) VALUES (?, ?, ?)',
                [name, email, experience]
            );

            await Promise.race([dbOperation, timeoutPromise]);

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
    } finally {
        await db.close();
    }
}