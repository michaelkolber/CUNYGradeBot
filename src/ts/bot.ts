require('dotenv').config();

const fs = require('fs');
const Telegraf = require('telegraf');


// Make sure a bot token is defined
if (process.env.TOKEN == undefined) {
    throw "You must specify TOKEN in a .env file in the root directory.";
}


// Initialize the bot
const bot = new Telegraf(process.env.TOKEN);


// TLS options
const tlsOptions = {
    key: fs.readFileSync(process.env.TLS_KEY_PATH),
    cert: fs.readFileSync(process.env.TLS_CERT_PATH),
    // ca: [
    //   // This is necessary only if the client uses the self-signed certificate.
    //   fs.readFileSync('client-cert.pem')
    // ]
}


// Set up the webhook
bot.telegram.setWebhook(process.env.LISTEN_URL, {
source: process.env.TLS_CERT_PATH
})


// Print all messages to the console
bot.use((ctx, next) => {
    console.log(ctx.message);
    next(ctx);
});


// Start https webhook
bot.startWebhook('/listen/messages', tlsOptions, 8443)


// Global commands
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))

// Bot commands
bot.command('class', middleware);
bot.command('professor', middleware);


// Launch the bot
bot.launch()
console.log('Bot is listening!');