const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for experiences (TODO: replace with database logic)
let experiences = [];

// Endpoint to submit a new experience
app.post('/api/submitExperience', (req, res) => {
    const { experience } = req.body;
    experiences.push(experience);
    res.status(201).json({ message: 'Experience submitted successfully' });
});

// Endpoint to get all experiences
app.get('/api/getExperiences', (req, res) => {
    res.json(experiences);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
