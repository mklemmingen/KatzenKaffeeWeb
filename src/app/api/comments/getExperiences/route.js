import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

async function openDb() {
    const dbPath = process.env.DB_PATH || path.resolve(__dirname, '../../../../server/_db/database.db');
    console.log('Database path:', dbPath); // Log the database path
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    });
}

export async function GET(req) {
    const db = await openDb();

    try {
        const experiences = await db.all('SELECT * FROM experiences');
        return new Response(JSON.stringify(experiences), { status: 200 });
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    } finally {
        await db.close();
    }
}