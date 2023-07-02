//Initialize express server and database connection
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');


var app = express();
app.use(express.json());
var server = http.createServer(app);
var db = new sqlite3.Database('./database/items.db');
db.run('CREATE TABLE IF NOT EXISTS item(item_id INTEGER PRIMARY KEY, description TEXT, due_date TEXT, priority TEXT)');

server.listen(3000,function(){ 
    console.log("Server listening on port: 3000");
});