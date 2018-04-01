var getPixels = require("get-pixels");
var Jimp = require("jimp");
var fs = require("fs");

var width = 0;
var height = 0;
var origWidth = 0;
var origHeight = 0;
var size = 30;
var framesAmount = 15;
var wstream = fs.createWriteStream("image.txt");

getPixels("img-source/frame_0_delay-0.01s.gif", function(err, pixels) {
  if (err) {
    console.log("Bad image path");
    return;
  }
  width = size;
  height = Math.floor(pixels.shape[2] / pixels.shape[1] * size);
  origWidth = pixels.shape[1];
  origHeight = pixels.shape[2];
  console.log("############### ===> ####", width, height);
});

for (var frame = 0; frame < framesAmount; frame++) {
  var imgSource = "img-source/frame_" + frame + "_delay-0.01s.gif";
  console.log("############### ===> ####", "foo");
  Jimp.read(imgSource, function(err, image) {
    var pixels = [];
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var hex = image.getPixelColor(
          Math.floor(origWidth / width * x),
          Math.floor(origHeight / height * y)
        );
        var obj = {
          x: x,
          y: y,
          color: Jimp.intToRGBA(hex)
        };
        pixels.push(obj);
      }
    }
    wstream.write(JSON.stringify(pixels) + ",\n");
    console.log("############### ===> ####", "meep");
    var waitTill = new Date(new Date().getTime() + 1300);
    while (waitTill > new Date()) {}
  });
  var waitTill = new Date(new Date().getTime() + 100);
  while (waitTill > new Date()) {}
  console.log("############### ===> ####", "bar");
}
