"use client";

import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function openDb() {
    const dbPath = process.env.DB_PATH || path.resolve(__dirname, '../../../server/_db/database.db');
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    });
}

export default async function handler(req, res) {
    const db = await openDb();

    try {
        if (req.method === 'POST') {
            const { name, email, experience } = req.body;
            console.log('Received experience:', { name, email, experience });

            // Use parameterized queries to prevent SQL injection
            const dbOperation = db.run(
                'INSERT INTO experiences (name, email, experience) VALUES (?, ?, ?)',
                [name, email, experience]
            );

            // Set a timeout for the database operation
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Database operation timed out')), 5000)
            );

            await Promise.race([dbOperation, timeoutPromise]);

            res.status(201).json({ message: 'Experience submitted successfully' });
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        // Ensure the database connection is closed
        await db.close();
    }
}