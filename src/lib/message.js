export default class Message {
  
  constructor(messageFromBot) {
    var message = this.mapMessage(messageFromBot);
    this.from = message.from
    this.text = message.text
    this.user = message.user
  }

  mapMessage(messageFromBot) {    
    return {
      from: messageFromBot.from.id,
      text: messageFromBot.text,
      user: {
        firstName: messageFromBot.from.first_name,
        lastName: messageFromBot.from.last_name
      }
    }
  }
  
}
    