const Telegraf = require('telegraf');

const token = process.env.TELEGRAM_TOKEN;

const bot = new Telegraf(token);
bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username
});

const dsMessage = require('./lib/dark_souls_message');
const exchange = require('./lib/exchange_rate');

dsMessage(bot);
exchange(bot);
bot.startPolling();
