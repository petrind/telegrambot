import TelegramBot from 'node-telegram-bot-api';
import Message from './message';
import config from '../config';
import handlers from '../handlers';

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

  handleText(messageFromBot) {    
    const message = new Message(messageFromBot);

    return handlers.Command.processCommand(this.bot, message);
  }
}
