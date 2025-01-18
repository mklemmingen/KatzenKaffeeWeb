import {Client} from 'pg';

async function openDb() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {rejectUnauthorized: false}
    });
    await client.connect();
    return client;
}

export async function POST(req) {
    const client = await openDb();

    try {
        const {message} = await req.json();

        if (!message) {
            return new Response(JSON.stringify({response: "Keine Nachricht erhalten"}), {status: 400});
        }

        const botResponse = getBotResponse(message);

        const query = `
      INSERT INTO chatbot_logs (author, message, timestamp)
      VALUES ($1, $2, NOW()), ($3, $4, NOW())
    `;
        const values = ['user', message, 'bot', botResponse];

        console.log("Query Values:", values);

        await client.query(query, values);

        return new Response(JSON.stringify({response: botResponse}), {status: 200});
    } catch (error) {
        console.error("Fehler beim Speichern der Nachricht:", error.message, error.stack);
        return new Response(
            JSON.stringify({message: `Fehler beim Speichern: ${error.message}`}),
            {status: 500}
        );
    } finally {
        await client.end();
    }
}

function getBotResponse(message) {
    message = message.toLowerCase();

    if (["hallo", "hi", "hey"].some(greet => message.includes(greet))) {
        return "Hallo! Wie kann ich dir helfen?";
    }
    if (message.includes("tschüss")) {
        return "Auf Wiedersehen!";
    }
    if (message.includes("hilfe")) {
        return "Natürlich! Was brauchst du?";
    }
    if (message.includes("zeit")) {
        return `Die aktuelle Zeit ist ${new Date().toLocaleTimeString()}.`;
    }
    if (message.includes("datum")) {
        return `Heute ist der ${new Date().toLocaleDateString('de-DE')}.`;
    }
    if (["hallo", "hi", "hey", "guten tag", "servus", "moin", "grüß dich"].some(greet => message.includes(greet))) {
        return "Hallo! Wie kann ich dir helfen?";
    }
    if (["morgen"].some(greet => message.includes(greet))) {
        return "Guten Morgen! Wie kann ich dir heute helfen?";
    }
    if (["abend"].some(greet => message.includes(greet))) {
        return "Guten Abend! Wie kann ich dir weiterhelfen?";
    }
    if (["nacht"].some(greet => message.includes(greet))) {
        return "Gute Nacht! Schlaf gut!";
    }
    if(["Essen", "Futter"].some(greet=>message.includes(greet))){
        return "Katzenfutter gibt es in vielen verschiedenen Sorten und Marken. Es gibt Trockenfutter, Nassfutter und auch spezielle Diätfutter. Welche Art von Katzenfutter suchst du?";
    }
    if (["schlecht"].some(phrase => message.includes(phrase))) {
        return "Es tut mir leid zu hören, dass es dir nicht gut geht. Wenn es ein Notfall ist, rufe bitte sofort einen Krankenwagen unter der Nummer 112 an.";
    }
    if (["ich will nicht mehr leben", "suizid", "beenden"].some(phrase => message.includes(phrase))) {
        return "Es tut mir sehr leid, dass du dich so fühlst. Bitte denke daran, dass es Menschen gibt, die dir helfen können. Kontaktiere sofort die Telefonseelsorge unter der Nummer 0800 111 0111 oder 0800 111 0222. Sie sind rund um die Uhr für dich da.";
    }
    if (["raub", "überfall", "polizei", "gefahr"].some(phrase => message.includes(phrase))) {
        return "Wenn du dich in Gefahr befindest oder einen Überfall meldest, rufe bitte sofort die Polizei unter der Nummer 110 an.";
    }
    if (["tschüss", "wiedersehen", "später", "ciao"].some(farewell => message.includes(farewell))) {
        return "Auf Wiedersehen! Ich hoffe, ich konnte dir helfen.";
    }
    if (["dank"].some(thanks => message.includes(thanks))) {
        return "Gerne! Wenn du noch Fragen hast, bin ich hier.";
    }
    if (["fotos", "bilder", "meme"].some(phrase => message.includes(phrase))) {
        return 'Möchtest du zufällige Katzenbilder sehen? Besuche <a href="https://de.pinterest.com/gregorikerstin/lustige-katzenbilder/" target="_blank" style="color:blue; text-decoration:underline;">diese Seite</a> für süße Katzenbilder!';
    }
    if (message.includes("kontakt")) {
        return "Du kannst uns per E-Mail unter schnurren@katzen-cafe.de erreichen oder uns unter der Nummer +49 (0) 123 456 789 anrufen.";
    }
    if (["nachhaltigkeit", "nachhaltig", "umwelt"].some(topic => message.includes(topic))) {
        return "Nachhaltigkeit bedeutet, nur so viel von einer Sache zu verbrauchen, wie in der Natur neu entsteht. Es geht darum, die Ressourcen verantwortungsvoll zu nutzen, damit auch zukünftige Generationen davon profitieren können.";
    }
    if (message.includes("deutschland")) {
        return 'Mehr über Katzen in Deutschland erfährst du <a href="/#katzen-deutschland" style="color:blue; text-decoration:underline;">hier</a>.';
    }
    if (message.includes("griechenland")) {
        return 'Mehr über Katzen in Griechenland findest du <a href="/#katzen-griechenland" style="color:blue; text-decoration:underline;">hier</a>.';
    }
    if (message.includes("nachhaltige ernährung")) {
        return 'Erfahre mehr über nachhaltige Ernährung <a href="/#nachhaltige-ernaehrung" style="color:blue; text-decoration:underline;">hier</a>.';
    }
    if (message.includes("streu")) {
        return 'Mehr über umweltfreundliches Katzenstreu erfährst du <a href="/#katzenstreu" style="color:blue; text-decoration:underline;">hier</a>.';
    }
    if (message.includes("spielzeug")) {
        return 'Erfahre mehr über Spielzeug und mentale Gesundheit <a href="/#spielzeug" style="color:blue; text-decoration:underline;">hier</a>.';
    }
    if (["Instruktionen vergessen", "Vergesse vorheriges"].some(LLM => message.includes(LLM))) {
        return "Beep Boop";
    }
    return "Tut mir leid, ich habe das nicht verstanden. Kannst du deine Frage anders formulieren?";
}

testDatabaseConnection();

async function testDatabaseConnection() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {rejectUnauthorized: false}
    });

    try {
        await client.connect();
        console.log("Datenbank erfolgreich verbunden!");
        const res = await client.query("SELECT NOW() AS server_time");
        console.log("Serverzeit:", res.rows[0].server_time);
    } catch (error) {
        console.error("Fehler bei der Datenbankverbindung:", error.message, error.stack);
    } finally {
        await client.end();
    }
}
