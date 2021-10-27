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

app.get('', (req, resp) => {
  con.query("SELECT ID, Name FROM sheet ORDER BY ID DESC",function(err,res) {
    if (err) throw err;
    console.log(res)
    resp.render('storage', {data: res})
  })
})

app.get('/new', (req, resp) => {
 resp.render('create')
})

app.get('/*', (req, resp) => {
  con.query("SELECT * FROM sheet WHERE ID=" + mysql.escape(url.parse(req.url, true).pathname.slice(1)),function(err,res) {
    if (err) throw err;
    resp.render('sheet', {data: res[0]})
  })
 })

app.listen(port, () => console.log(port))

var con = mysql.createConnection({
  host: "localhost",
  user: config.USER,
  password: config.PASSWORD,
  database: "dnd"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM sheet", function(err, res) {
    if (err) throw err;
    //console.log(res)
  })
});