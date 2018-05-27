const https = require('https');

module.exports = bot => {
  bot.command('exchange', function({ replyWithMarkdown }) {
    return new Promise((resolve) => {
      return https.get('https://www.cbr-xml-daily.ru/daily_json.js',
        function(res) {
          let rawData = '';
          res.on('data', (chunk) => {
            rawData += chunk;
          });
          res.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
              let results = [];
              for (let valute in parsedData.Valute) {
                results.push(parsedData.Valute[valute]);
              }
              resolve(results);
            } catch (e) {
              console.error(e.message);
            }
          });
        });
    }).then(valutes => {
      let text = valutes.map(valute => {
        return `${valute.Name} (*${valute.CharCode}*) *${(valute.Value / valute.Nominal).toFixed(2)}* ${((valute.Value - valute.Previous) / valute.Nominal).toFixed(3)}`;
      }).join('\n');

      return replyWithMarkdown(text);
    }).catch(console.log);
  });
};
