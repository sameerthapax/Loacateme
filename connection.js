const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host     : 'mysql.freehostia.com',
    user     : 'samtha16_mylocation',
    password : 'Pokhara@22',
    database : 'samtha16_mylocation',
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});
// Export the connection for use in other files
module.exports = connection;
