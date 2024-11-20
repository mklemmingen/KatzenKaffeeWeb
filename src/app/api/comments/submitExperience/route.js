import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

async function openDb() {
    const dbPath = process.env.DB_PATH || path.resolve(__dirname, '../../../../server/_db/database.db');
    console.log('Database path:', dbPath); // Logging the database path
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    });
}

export async function POST(req) {
    const db = await openDb();

    try {
        const { name, email, experience } = await req.json();
        console.log('Received experience:', { name, email, experience });

        // Using parameterized queries to prevent SQL injection
        const dbOperation = db.run(
            'INSERT INTO experiences (name, email, experience) VALUES (?, ?, ?)',
            [name, email, experience]
        );

        // Setting a timeout for the database operation
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Database operation timed out')), 5000)
        );

        await Promise.race([dbOperation, timeoutPromise]);

        return new Response(JSON.stringify({ message: 'Experience submitted successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error handling request:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    } finally {
        await db.close();
    }
}