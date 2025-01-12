
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
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
          JSON.stringify({ message: "Bitte alle Felder ausfüllen." }),
          { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const query = 'INSERT INTO contacts (name, email, message, timestamp) VALUES ($1, $2, $3, $4)';
    const values = [name, email, message, timestamp];

    await client.query(query, values);

    return new Response(
        JSON.stringify({ message: "Nachricht erfolgreich gespeichert!" }),
        { status: 200 }
    );
  } catch (error) {
    console.error("Fehler beim Speichern der Nachricht:", error);
    return new Response(
        JSON.stringify({ message: "Fehler beim Speichern der Nachricht." }),
        { status: 500 }
    );
  } finally {
    await client.end();
  }
}