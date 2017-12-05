import Messenger from './lib/messenger';

const bot = new Messenger();

bot.Listen().then(() => { console.log('Listening'); });