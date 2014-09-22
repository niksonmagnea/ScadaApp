var express = require('express')
var app = express();
var http = require('http').Server(app);
var path = require('path');
var mongoose = require('mongoose');
var load = require('express-load');
var io = require('socket.io')(http);

global.db = mongoose.connect('mongodb://localhost/gordinhobd',function(error){
  if (error) 
  {
    console.log(error);
  }
  else
  {
    console.log("Bd conected OK!");
  }
});

app.use(express.static(path.resolve(__dirname, 'views')));

app.get('/', function(req,res)
{
  res.sendFile(__dirname + "/views/index.html");
});

load('models')
.then('sockets')
.into(io);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
