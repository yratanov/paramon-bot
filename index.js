const Telegraf = require('telegraf');

const token = process.env.TELEGRAM_TOKEN;

const bot = new Telegraf(token);
bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username
});

const dsMessage = require('./lib/dark_souls_message');
const dsNewsMessage = require('./lib/dark_souls_news_message');
const exchange = require('./lib/exchange_rate');
const steam = require('./lib/steam_sales');

dsMessage(bot);
dsNewsMessage(bot);
exchange(bot);
steam(bot);
bot.startPolling();
