const dsMessage = require("./ds_txt");
const { createCanvas, Image } = require("canvas");
const fs = require("fs");
const path = require("path");

const tempFileName = "/tmp/ds.png";
const width = 937;
const height = 205;

function generatePhoto(text) {
  var canvas = createCanvas(width, height);
  var ctx = canvas.getContext("2d");

  var img = new Image();
  img.src = "./images/plague.png";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = '30px "Comic Sans"';

  let { actualBoundingBoxDescent } = ctx.measureText(text);
  ctx.fillText(text, width / 2, height / 2 - actualBoundingBoxDescent);

  canvas.createPNGStream().pipe(fs.createWriteStream(tempFileName));
  return tempFileName;
}

module.exports = (bot) => {
  bot.command("praise", function ({ replyWithPhoto }) {
    return replyWithPhoto({ source: generatePhoto(dsMessage()) });
  });
};
