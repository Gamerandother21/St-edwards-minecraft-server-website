const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// CHANGE THIS PASSWORD
const PASSWORD = "admin123";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Get mode
app.get('/mode', (req, res) => {
    const mode = fs.readFileSync('mode.txt', 'utf-8');
    res.send(mode);
});

// Update mode
app.post('/update', (req, res) => {
    const { password, mode } = req.body;

    if (password !== PASSWORD) {
        return res.send("Wrong password");
    }

    fs.writeFileSync('mode.txt', mode);
    res.send("Updated! Go back.");
});

// Get config
app.get('/config', (req, res) => {
    const config = fs.readFileSync('config.txt', 'utf-8');
    res.send(config);
});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});