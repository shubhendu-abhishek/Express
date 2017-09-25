var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connection to mongoose
mongoose.connect('mongodb://localhost/books');
var db = mongoose.connection;

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.listen(3000);
console.log('App running on port 3000 ......');