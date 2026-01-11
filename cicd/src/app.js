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
        res.status(200).json({ message: 'Login successful! Welcome to CI/CD.' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = app;
