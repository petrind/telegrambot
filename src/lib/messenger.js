import TelegramBot from 'node-telegram-bot-api';
import Message from './message';
import config from '../config';
import InputParser from './inputParser';
import handlers from '../handlers';

const inputParser = new InputParser();

export default class Messenger {

  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.bot = new TelegramBot(config.telegram.token, { webHook: { port: config.telegram.port, host: config.telegram.host } });
      this.bot.setWebHook(config.telegram.externalUrl + ':443/bot' + config.telegram.token);
    } else {
      this.bot = new TelegramBot(config.telegram.token, { polling: true });
    }
  }

  listen() {
    this.bot.on('text', this.handleText.bind(this));
    return Promise.resolve();
  }

  handleText(msg) {
    //format the message
    const message = new Message(Message.mapMessage(msg));

    return handlers.Command.processCommand(this.bot, message);
  }
}
