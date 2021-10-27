var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express')
var app = express()
var port = 5000
var mysql = require('mysql');
var config = require('./config.json');
const path = require('path');
const { SSL_OP_NO_QUERY_MTU } = require('constants');

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
  res.render('storage', {DB: dbData})
})

app.get('/new', (req, res) => {
 res.render('create')
})

app.get('/*', (req, res) => {
  res.render('sheet', {SheetData: data})
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
  con.query("CREATE TABLE sheet (ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL, Name TEXT, Classes VARCHAR(200), Levels VARCHAR(200), Exp INT, Background TEXT, Player TEXT, Race TEXT, Alignment TEXT, Inspiration BOOL, Prof INT, STR INT, DEX INT, CON INT, INT INT, WIS INT, CHA INT, Saves VARCHAR(200), Skills VARCHAR(200), SubClasses VARCHAR(200), Speed VARCHAR(200), HP INT, MaxHP INT, THP INT, HD VARCHAR(255), DSaves VARCHAR(200), Gold INT, Weapons TEXT, WeaponDesc VARCHAR(255), WeaponAttack VARCHAR(200), WeaponDmg VARCHAR(255), AC INT, Initiative INT, Profs TEXT, Equipment VARCHAR(255), PTraits TEXT, Ideals TEXT, Bonds TEXT, Flaws TEXT, Feats VARCHAR(65535), Age INT, Height FLOAT, Weight INT, Eyes TEXT, Skin TEXT, Hair TEXT, Backstory TEXT, SpellAbility VARCHAR(3), SpellSave INT, SpellAttack INT, Cantrips VARCHAR(255), Spell1Slots INT, Spell1 TEXT, Spell2Slots INT, Spell2 TEXT, Spell3Slots INT, Spell3 TEXT, Spell4Slots INT, Spell4 TEXT, Spell5Slots INT, Spell5 TEXT, Spell6Slots INT, Spell6 TEXT, Spell7Slots INT, Spell7 TEXT, Spell8Slots INT, Spell8 TEXT, Spell9Slots INT, Spell9 TEXT, SlotsUsed VARCHAR(200), Prepped VARCHAR(255), CharDesc TEXT)", function(err, res) {
    if (err) throw err;
    console.log(res)
  })
});