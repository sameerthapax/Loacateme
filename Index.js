// index.js
const connection = require('./connection');

// Example query to select data
function viewAllQuery() {
    connection.query('SELECT * FROM loctions', (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return;
        }
        console.log('Results:', JSON.stringify(results));
    });
}

function insertQuery(latitude, longitude, accuracy) {
    const locationData = { latitude: latitude,
        longitude: longitude,
        accuracy: accuracy,
        date: new Date() };
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
function viewLastQuery(){
    connection.query('SELECT * FROM loctions ORDER BY id DESC LIMIT 1', (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return;
        }
        console.log('Last inserted location:', JSON.stringify(results[0].Id));
    });
}

// You can close the connection if necessary, but it's generally better to manage this in a more centralized way.
