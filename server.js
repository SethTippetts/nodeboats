

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var dotenv = require('dotenv');
var Boat = require('./boat');

dotenv.config();

var boat = new Boat();
server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/gamepad', function (req, res) {
  res.sendfile(__dirname + '/gamepad.html');
});

app.get('/vJoystick.js', function (req, res) {
  res.sendfile(__dirname + '/vJoystick.js');
});


io.on('connection', function (socket) {
  socket.emit('hello', { hello: 'world' });

  socket.on('data', function(data) {
    console.log('data', data);
    boat.forward(data.speed || 0);
    boat.turn(data.degree || 90);
  });
});
