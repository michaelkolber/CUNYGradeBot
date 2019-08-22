// Load environment variables
require('dotenv').config();

// Imports
import * as parsers from './parsers'

const fs = require('fs');
const Telegraf = require('telegraf');


// Make sure a bot token is defined
if (process.env.TOKEN == undefined) {
    throw new Error('You must specify TOKEN in a .env file in the root directory.');
}


// Initialize the bot
const bot = new Telegraf(process.env.TOKEN);


/* Set the webhook on Telegram's side. Since we're using a valid cert, we don't need to 
 * include our public certificate.
 */
bot.telegram.setWebhook('https://' + 
                        process.env.LISTEN_HOST + 
                        ':' + 
                        process.env.LISTEN_PORT + 
                        process.env.LISTEN_PATH);

// Disable webhook replies, as they don't seem to work.
bot.telegram.webhookReply = false;


// Print all messages to the console
bot.use((ctx, next) => {
    console.log(ctx.message);
    next(ctx);
});


// Global commands
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))

// Bot commands
bot.command('class', parsers.parseClassMessage);
bot.command('professor', parsers.parseProfessorMessage);


// TLS options
const tlsOptions = {
    key: fs.readFileSync(process.env.TLS_KEY_PATH),
    cert: fs.readFileSync(process.env.TLS_CERT_PATH),
}

// Start listening
bot.startWebhook(process.env.LISTEN_PATH, tlsOptions, process.env.LISTEN_PORT);  // TODO: Use secret path?

console.log('Bot is listening!');