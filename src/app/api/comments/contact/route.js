import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return new Response(
        JSON.stringify({ message: "Bitte alle Felder ausfüllen." }),
        { status: 400 }
      );
    }

    // Definiere den Pfad zur JSON-Datei
    const filePath = path.join(process.cwd(), 'messages.json');
    const timestamp = new Date().toISOString();

    // Neue Nachricht mit Zeitstempel
    const newMessage = {
      name: body.name,
      email: body.email,
      message: body.message,
      timestamp,
    };

    // Bestehende Nachrichten laden (falls vorhanden)
    let messages = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      messages = JSON.parse(fileContent);
    }

    // Neue Nachricht hinzufügen
    messages.push(newMessage);

    // Speichere die aktualisierten Nachrichten in der JSON-Datei
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

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
  }
}
