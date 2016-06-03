var five = require("johnny-five");
var Particle = require("particle-io");


var board = new five.Board({
  io: new Particle({
    token: process.env.PARTICLE_TOKEN,
    deviceId: process.env.PARTICLE_DEVICE_ID
  })
});

board.on("ready", function() {
  console.log("Device Ready..");
  
  var motorL = new five.Motor({
    pin: 'A4'
  });

  var motorR = new five.Motor({
    pin: 'A5'
  });

  var servo = new five.Servo("D0");

  board.repl.inject({
    l: motorL,
    r: motorR,
    s: servo
  });
});