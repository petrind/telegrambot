import Time from "../services/time";
import Progress from "../services/progress";
import AppVersion from "../services/appVersion";
import Promise from "bluebird";

const time = new Time();
const progress = new Progress();

export default class Command {
  constructor() {    
  }

  commandMap() {
    var commandMap = {      
      start: {
        string: "/start",
        function: self.getGreeting,
        description: "/start to start the bot",
        textInput: 0,
      },
      supportedVersion: {
        string: "/supportedversion",
        function: self.getSupportedVersion,
        description: "/supportedversion <name of application> " 
          + " to know newest version and which version is supported"
          + "%\n example: /supportedversion <chrome> ",
        textInput: 1,
      },      
      default: {
        string: "/help",
        function: self.getHelp,
        description: "/help" 
          + " to know the command supported in this bot"
          + "%\n example: /help",
          textInput: 0,
      },
    }
    return commandMap;
  }

  ProcessCommand(bot, message){
    console.log("get message")
    var commandMap = self.commandMap();
    var commandString = self.mapToCommand(message);    
    if (commandString) {
      self.putMessageWithoutCommand(message, commandString);      
      return commandMap[commandString].function(bot, message);
    } else {
      return commandMap["default"].function(bot, message);
    }
  }

  mapToCommand(message) {
    var commandMap = self.commandMap();    
    var arrayText = message.text.split(" ");    
    for (var key in commandMap) {
      if (arrayText[0] && arrayText[0].match(commandMap[key].string)) {
        return key;
      }
    }
    return null;
  }

  putMessageWithoutCommand(message, commandString) {
    var commandMap = self.commandMap();
    if(message && message.text) {
      var textWithoutCommand = message.text.replace(commandMap[commandString].string, "").trim();
      var arrayText = textWithoutCommand.replace(">", "").split("<");
      arrayText.forEach(element => {
        element = element.trim();
      });
    }
    message.arrayText = arrayText;
  }
  
  //region function command

  getSupportedVersion(bot, message) {    
    return Promise.try(function () {      
      return AppVersion.findApplication(message.arrayText[0]);
    })
    .then(function(result) {
      bot.sendMessage(message.from, result);
    })
  }

  getGreeting(bot, message) {
    bot.sendMessage(message.from, 'Hi, there! It is nice to see you here!');
  }

  getHelp(bot, message) {
    var commandMap = self.commandMap();
    var text = "";
    for (var key in commandMap) {
      text += commandMap[key].description + "\n\n";
    }
    bot.sendMessage(message.from, text);
  }
  //endregion
}
const self = new Command();