const fs = require('fs');
const http = require('http');
const Markup = require('telegraf/markup');

module.exports = bot => {
  const points = [
    { title: 'свердловская', id: '1', },
    { title: 'комсомольский', id: '2', },
    { title: 'железнодорожников', id: '3', },
    { title: 'копылова', id: '6', },
    { title: 'юности', id: '13', },
    { title: 'павлова', id: '14', },
    { title: 'перенсона', id: '17', },
    { title: 'ады', id: '18', },
    { title: 'киренского', id: '21', },
    { title: 'щорса', id: '22', },
    { title: 'базаиха', id: '25', },
  ];

  const url = 'http://krasnoyarsknebo.ru/share/';

  points.forEach((p, index) => {
    bot.hears(`${index + 1}) ${p.title}`, ({ replyWithPhoto }) => {
      let tempFileName = '/tmp/tempImage.png';
      http.get(url + p.id, (response) => {
        response.pipe(fs.createWriteStream(tempFileName))
          .on('finish', () => {
            replyWithPhoto({ source: tempFileName })
          })
      })
    })
  });

  bot.command('pollution', function({ reply }) {
    let index = 1;
    let keyboard = points.reduce((array, el) => {
      let lastArray = array[array.length - 1];
      if (lastArray.length > 2) {
        lastArray = [];
        array.push(lastArray);
      }
      lastArray.push(index + ') ' + el.title);
      index++;
      return array;
    }, [[]]);

    return reply('Выберите место', Markup
      .keyboard(keyboard)
      .oneTime()
      .resize()
      .extra()
    )
  });
};
