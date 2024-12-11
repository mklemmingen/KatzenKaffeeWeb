import { Client } from 'pg';

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

export async function POST(req) {
    const client = await openDb();

    try {
        const { name, email, experience } = await req.json();
        console.log('Received experience:', { name, email, experience });

        const query = 'INSERT INTO experiences (name, email, experience) VALUES ($1, $2, $3)';
        const values = [name, email, experience];

        await client.query(query, values);

        return new Response(JSON.stringify({ message: 'Experience submitted successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error handling request:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    } finally {
        await client.end();
    }
}