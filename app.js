//Built-in Node.js Modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

//User-installed modules
var mysql = require('mysql');
var express = require('express')

//Common global configuration variables
var app = express()
var port = 5000
var config = require('./config.json');

//Create a database connection
var con = mysql.createConnection({
  host: "localhost",
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE
});

////////////////////////////////////////////////////////////////////////////////////////////////////

//Make a connection to the database to check if it is connected
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Define Express-variables
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

////////////////////////////////////////////////////////////////////////////////////////////////////

//Route Index to Character Sheet overview
app.get('/', (req, resp) => {
  con.query("SELECT ID, Name FROM sheet ORDER BY ID DESC",function(err,res) {
    if (err) throw err;
    console.log(res)
    resp.render('storage', {data: res})
  })
})

//Route New to Sheet Creation
app.get('/new', (req, resp) => {
 //resp.render('create')
 resp.redirect('/')
 window.alert("This page is not yet finished")
})

//Route any remaining requests to a sheet with the provided ID, or redirect to Index if no matching ID is found
app.get('/*', (req, resp) => {
  if(url.parse(req.url, true).pathname.slice(1).toLowerCase() == "new" || url.parse(req.url, true).pathname.slice(1).toLowerCase() == "favicon.ico") return;
  con.query("SELECT * FROM sheet WHERE ID = ?", url.parse(req.url, true).pathname.slice(1) ,function(err,res) {
    if (err) throw err;
    if (res[0]==undefined) return resp.redirect('/');
    resp.render('sheet', {data: res[0]})
  })
 })

 //Listen on port
app.listen(port, () => console.log(port))