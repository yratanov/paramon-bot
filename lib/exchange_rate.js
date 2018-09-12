const axios = require('axios');

const validValute = ['USD', 'EUR', 'GBP'];

module.exports = bot => {
  bot.command('exchange', function({ replyWithMarkdown }) {
    axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(({ data }) => {
        let results = [];
        for (let v in data.Valute) {
          valute = data.Valute[v];

          if (validValute.includes(valute.CharCode)) {
            results.push(`*${valute.CharCode}*  -  *${(valute.Value / valute.Nominal).toFixed(2)}*  -  ${valute.Value > valute.Previous ? '↑' : '↓'}${Math.abs((valute.Value - valute.Previous) / valute.Nominal).toFixed(3)}`);
          }
        }
        return replyWithMarkdown(results.join("\n"));
      }).catch(console.log);
  });
};
