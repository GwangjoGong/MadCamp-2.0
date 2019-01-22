var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var PORT = 80;
//CONFIGURATION
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var server = app.listen(PORT, function(){
  console.log("Server is running on Port : "+ PORT);
});


var connection = mongoose.connection;

connection.once('open',function(){
  console.log("MongoDB database connection established successfully");
});


//Define Model
var User =require('./models/user');
var Post =require('./models/post');
var Word =require('./models/word');

// TODO: configure router.
var router = require('./routes')(app, User, Post, Word);
