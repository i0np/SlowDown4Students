// Sets up the connection to the mySQL database.
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'student'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = connection;