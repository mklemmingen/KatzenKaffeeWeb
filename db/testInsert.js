const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function openDb() {
    return sqlite.open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}

async function testInsert() {
    const db = await openDb();

    try {
        // Insert test data
        await db.run('INSERT INTO experiences (name, email, experience) VALUES (?, ?, ?)', [
            'Test User',
            'test@example.com',
            'This is a test experience'
        ]);

        // Fetch the data to verify insertion
        const result = await db.all('SELECT * FROM experiences WHERE email = ?', ['test@example.com']);
        console.log('Inserted data:', result);
    } catch (error) {
        console.error('Error during test insert:', error);
    } finally {
        await db.close();
    }
}

testInsert();