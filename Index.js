const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./connection');

app.use(bodyParser.json());
app.use(express.static('public'));

// Insert location with provided data
app.post('/insert-location', (req, res) => {
    const { latitude, longitude, accuracy } = req.body;
    insertQuery(latitude, longitude, accuracy);
    res.send('Location inserted successfully');
});

// Insert ghost mode data (0,0,0)
app.post('/ghost-mode', (req, res) => {
    insertQuery(0, 0, 0);
    res.send('Ghost mode activated');
});

// Get the last inserted location data
app.get('/last-location', (req, res) => {
    connection.query('SELECT * FROM loctions ORDER BY id DESC LIMIT 1', (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send('Error retrieving data');
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('No data found');
        }
    });
});

// Insert query function
function insertQuery(latitude, longitude, accuracy) {
    const locationData = {
        latitude: latitude,
        longitude: longitude,
        accuracy: accuracy,
        date: new Date()
    };
    connection.query('INSERT INTO loctions SET ?', locationData, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return;
        }
        console.log('Insert successful, ID:', results.insertId);
        connection.query('DELETE FROM loctions WHERE id NOT IN (SELECT id FROM (SELECT id FROM loctions ORDER BY id DESC LIMIT 11) as t)', (err, results) => {
            if (err) {
                console.error('Error executing delete query:', err.stack);
                return;
            }
            console.log('Old records deleted, affected rows:', results.affectedRows);
        });
    });
}

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
