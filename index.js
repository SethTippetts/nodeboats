var five = require("johnny-five");
var Spark = require("spark-io");
var dotenv = require('dotenv');

dotenv.config();

var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID
  })
});

board.on("ready", function() {
  var led = new five.Led("D7");
  var motorL = new five.Motor({
    pin: 'A4',
  });
  var motorR = new five.Motor({
    pin: 'A5',
  });
  var rudder = new five.Servo('D0');
  console.log('board ready!!!');
  // This bit of js injects the led variable into the
  // repl you get after this script finishes execution.
  board.repl.inject({
    led: led,
    left: motorL,
    right: motorR,
    rudder: rudder,
  });

});
