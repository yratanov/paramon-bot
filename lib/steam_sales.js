const axios = require('axios');

module.exports = bot => {
  bot.command('steam_sales', function({ replyWithMarkdown }) {
    axios.get('https://store.steampowered.com/api/featuredcategories/?language=russian&cc=RU')
      .then(({ data }) => {
        let results = data.specials.items.map(d => `[${d.name}](https://store.steampowered.com/app/${d.id}) - ${d.final_price/100} ${d.currency}${d.discounted ? ` *-${d.discount_percent}%*` : '' }`);
        return replyWithMarkdown(results.join("\n"));
      }).catch(console.log);
  });
};
