// Load environment variables
require('dotenv').config();

// Requires
const fs = require('fs');
const pino = require('pino');
const Telegraf = require('telegraf');

// Imports
import * as parsers from './parsers'



// Set up logger
const logger = pino({level: process.env.LOG_LEVEL || 'info'});

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
    logger.debug(ctx.message);
    next(ctx);
});


// Global commands
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Use /class or /professor'))

// Bot commands
bot.command('class', parsers.parseClassMessage);
bot.command('professor', parsers.parseProfessorMessage);


// TLS options
const tlsOptions = {
    cert: fs.readFileSync(process.env.TLS_CERT_PATH),
    key: fs.readFileSync(process.env.TLS_KEY_PATH),
};

// Start listening
bot.startWebhook(process.env.LISTEN_PATH, tlsOptions, process.env.LISTEN_PORT);  // TODO: Use secret path?

logger.info(`Gradebot is listening! Host: ${process.env.LISTEN_HOST} | Port: ${process.env.LISTEN_PORT}`);
