var util = require("util");
var EventEmitter = require("events").EventEmitter;
var five = require("johnny-five");
var Particle = require("particle-io");

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

const FACTOR = 0.25;

function Boat() {
  EventEmitter.call(this);
  console.log(process.env.SPARK_TOKEN);
  console.log(process.env.SPARK_DEVICE_ID);
  var board = new five.Board({
    io: new Particle({
      token: process.env.SPARK_TOKEN,
      deviceId: process.env.SPARK_DEVICE_ID
    })
  });


  board.on("ready", function () {
    console.log("Device Ready..");

    this.motorL = new five.Motor({ pin: 'A4'});
    this.motorR = new five.Motor({ pin: 'A5'});
    this.rudder = new five.Servo("D0");

    this.rudder.to(90);

    this.emit('ready');

  }.bind(this));

  this.board = board;
}
util.inherits(Boat, EventEmitter);


Boat.prototype.move = function(y, x) {
  let leftThrust = y;
  let rightThrust = y;

  if (Math.abs(x) > FACTOR) {
    if (x > 0) leftThrust - x;
    else rightThrust + x;
  }

  console.log('rudder', x.map(-1, 1, 45, 135));
  this.motorL.start(leftThrust.map(-1, 1, 200, -200));
  this.motorR.start(rightThrust.map(-1, 1, 200, -200));
  this.rudder.to(x.map(-1, 1, 45, 135));
};

Boat.prototype.stop = function(speed) {
  this.motorL.stop();
  this.motorR.stop();
};

module.exports = Boat;
