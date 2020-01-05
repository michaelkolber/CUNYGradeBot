// Load environment variables
require('dotenv').config();

// Requires
import fs = require('fs');
import pino = require('pino');
const Telegraf = require('telegraf');

// Imports
import * as parsers from './parsers';



// Set up logger
const logger = pino({
    base: {
        pid: process.pid,
    },
    level: process.env.LOG_LEVEL || 'info',
});
const infoLogger = logger.child({type: 'info'});
const messageLogger = logger.child({type: 'message'});

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

/* Log message stats to avoid abuse and ensure messages are
 * coming through on time. Keep logging to a minimum. DO NOT
 * log message text.
 */
bot.use((ctx, next) => {
    const message = ctx.message;
    const stats: any = {
        message_timestamp:  message.date,
        sender_id:          message.from.id,
        sender_is_bot:      message.from.is_bot,
        chat_id:            message.chat.id,
        chat_type:          message.chat.type,
    };
    
    if (ctx.message.chat.type == 'group') {
        stats.group_name = ctx.message.chat.title;
    }
    
    messageLogger.info(stats);
    next(ctx);
});


// Global commands
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Use /class or /professor'));

// Bot commands
bot.command('class', parsers.parseClassMessage);
bot.command('professor', parsers.parseProfessorMessage);


// TLS options
const tlsOptions = {
    cert: fs.readFileSync(process.env.TLS_CERT_PATH || './ssl/privkey.pem'),
    key: fs.readFileSync(process.env.TLS_KEY_PATH || './ssl/fullchain.pem'),
};

// Start listening
bot.startWebhook(process.env.LISTEN_PATH, tlsOptions, process.env.LISTEN_PORT);

// Set the username so the bot can respond appropriately to `/command@BotUsername`-style messages
bot.telegram.getMe()
    .then((result) => {
        bot.options.username = result.username;
        infoLogger.info(`Bot username retrieved as '${result.username}'.`);
    })
    .catch((err) => {
        logger.error("An error occurred when trying to get the bot's username.\n" + err);
    });

// Restart the bot so the detected username can take effect
bot.stop()
    .then(() => {
        bot.startWebhook(process.env.LISTEN_PATH, tlsOptions, process.env.LISTEN_PORT);
    })
    .catch((err) => {
        logger.error('Failed to restart the bot.\n' + err);
    });

infoLogger.info('Gradebot is listening!');
infoLogger.info(`Host: ${process.env.LISTEN_HOST}`);
infoLogger.info(`Port: ${process.env.LISTEN_PORT}`);
