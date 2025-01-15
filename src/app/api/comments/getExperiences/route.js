import {Client} from 'pg';

async function openDb() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    await client.connect();
    return client;
}

export async function GET(req) {
    const client = await openDb();

    try {
        const res = await client.query('SELECT * FROM experiences');
        return new Response(JSON.stringify(res.rows), {status: 200});
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500});
    } finally {
        await client.end();
    }
}