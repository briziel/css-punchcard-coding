var getPixels = require("get-pixels");
var Jimp = require("jimp");
var fs = require("fs");

var width = 0;
var height = 0;
var origWidth = 0;
var origHeight = 0;
var size = 30;

getPixels("chuck.jpg", function(err, pixels) {
  if (err) {
    console.log("Bad image path");
    return;
  }
  width = size;
  height = Math.floor(pixels.shape[1] / pixels.shape[0] * size);
  origWidth = pixels.shape[0];
  origHeight = pixels.shape[1];
  console.log("############### ===> ####", width, height);
});

var pixels = [];

Jimp.read("chuck.jpg", function(err, image) {
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

  fs.writeFile("chuck.js", JSON.stringify(pixels), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
});
