const dsMessage = require("./ds_txt");
const newsKey = process.env.NEWS_API_KEY;
const axios = require('axios');

module.exports = bot => {
  bot.command('praiseNews', function({ replyWithMarkdown }) {
    axios.get('https://newsapi.org/v2/top-headlines?country=ru&pageSize=100&apiKey=' + newsKey)
      .then(({ data }) => {
        let article = data.articles[Math.round(Math.random() * (data.totalResults - 1))];
        return article.title;
      }).then(text => {
      return replyWithMarkdown(`*${text}*` + "\n" + dsMessage());
    }).catch(console.log);
  });
};
