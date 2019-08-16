"use strict";
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const Telegraf = require('telegraf');
// Make sure a token is defined
if (process.env.TOKEN == undefined) {
    throw "You must specify TOKEN in a .env file in the root directory.";
}
const bot = new Telegraf(process.env.TOKEN);
// TLS options
const tlsOptions = {
    key: fs.readFileSync(process.env.TLS_KEY_PATH),
    cert: fs.readFileSync(process.env.TLS_CERT_PATH),
};
// Set telegram webhook
bot.telegram.setWebhook(process.env.LISTEN_URL, {
    source: process.env.TLS_CERT_PATH
});
bot.use((ctx, next) => {
    console.log(ctx.message);
    next(ctx);
});
// Start https webhook
bot.startWebhook('/listen/messages', tlsOptions, 8443);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
console.log('Bot is listening!');
// const app = express()
// const port = 3000
// app.get('/', (req, res) => res.send(`Running`));
// app.listen(port, () => console.log(`App listening on port ${port}!`));
