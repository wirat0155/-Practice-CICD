const express = require('express');
const app = express();

app.use(express.json());

// Simple Health Check
app.get('/', (req, res) => {
    res.status(200).send('OK');
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Mock Database Check
    // Best Practice: Never store passwords in plain text in real apps! 
    if (username === 'admin' && password === '1234') {
        // BUG: Accidental server error!
        res.status(500).json({ message: 'Internal Server Error' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = app;
