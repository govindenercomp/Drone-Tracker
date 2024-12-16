const express = require('express');
const fs = require('fs');
const https = require('https'); // Import HTTPS module
const cors = require('cors');

const app = express();
const port = 4000;

// SSL Certificate paths (Update these with your certificate paths)
const sslOptions = {
    key: fs.readFileSync('cert/key.pem'),  // Private key
    cert: fs.readFileSync('cert/cert.pem') // Certificate
};

// Use the CORS middleware
app.use(cors());

app.use(express.json());

// Endpoint to upload data and save it
app.post('/upload', (req, res) => {
    const data = req.body;
    fs.writeFileSync('location.json', JSON.stringify(data, null, 2));
    res.send('Data received and saved');
});

// Endpoint to fetch the saved data
app.get('/location', (req, res) => {
    try {
        const data = fs.readFileSync('location.json', 'utf8');
        res.send(data);
    } catch (err) {
        res.status(500).send('Error reading location data');
    }
});

// Start the server using HTTPS
https.createServer(sslOptions, app).listen(port,'0.0.0.0', () => {
    console.log(`Secure server running at https://192.168.5.141:${port}`);
});
