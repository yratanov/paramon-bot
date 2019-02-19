const dsMessage = require("./ds_txt");

const ie = require('image-editor');

function generatePhoto(text) {
  let tempFileName = '/tmp/ds.png';
  return ie.readFile('./images/plague.png')
    .then(buffer => ie.write(buffer, text, 10, -30, 'North'))
    .then(buffer => ie.writeFile(buffer, tempFileName))
    .then(() => tempFileName)
    .catch(console.log);
}

module.exports = bot => {
  bot.command('praise', function({ replyWithPhoto }) {
    return generatePhoto(dsMessage()).then((photo) => replyWithPhoto({ source: photo }));
  });
};
