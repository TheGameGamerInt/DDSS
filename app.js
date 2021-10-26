var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express')
var app = express()
var port = 5000
var mysql = require('mysql');
var config = require('./config.json');
const path = require('path');

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
  res.render('index', { text: 'Hey' })
})

app.get('/about', (req, res) => {
 res.render('about')
})

app.listen(port, () => console.log(port))

var con = mysql.createConnection({
  host: "localhost",
  user: "Snorre",
  password: config.PASSWORD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});