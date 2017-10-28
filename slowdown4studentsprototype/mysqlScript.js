var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
    // DB connection properties
    host:'localhost',
    user:'root',
    password:'root',
    database:'student'
});

connection.connect(function(error){
  if (error) {
      console.log('Error in connection');
  } else {
    console.log('Connected to database');
  }
});


app.get('/', function(req, resp){
    connection.query("SELECT * FROM login", function(error, rows, fields){
        if (error) {
            console.log('Error in query');
        } else {
          console.log('parse the fields', rows);
          resp.send('hello, ' + rows[0].userName);
        }
    });
})

app.listen(1337);