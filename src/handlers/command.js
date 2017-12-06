import Time from "../services/time";
import Progress from "../services/progress";

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
      },
      supportedVersion: {
        string: "/supportedversion",
        function: self.getSupportedVersion,
        description: "/supportedversion <name of application> " 
          + " to know newest version and which version is supported"
          + "%\n example: /supportedversion <chrome> ",
      },
      isSupportedVersion: {
        string: "/issupportedversion",
        function: self.getIsSupportedVersion,
        description: "/issupportedversion <name of application> <version>" 
          + " to know if the version is supported"
          + "%\n example: /issupportedversion <chrome> <1543>",
      },
      default: {
        string: "/help",
        function: self.getHelp,
        description: "/help" 
          + " to know the command supported in this bot"
          + "%\n example: /help",
      },
    }
    return commandMap;
  }

  ProcessCommand(bot, message){
    var commandMap = self.commandMap();
    var commandString = self.mapToCommand(message);    
    if (commandString) {
      return commandMap[commandString].function(bot, message);
    } else {
      return commandMap["default"].function(bot, message);
    }
  }

  mapToCommand(message){
    var commandMap = self.commandMap();    
    var arrayText = message.text.split(" ");    
    for (var key in commandMap) {
      if (arrayText[0] && arrayText[0].match(commandMap[key].string)) {
        return key;
      }
    }
    return null;
  }
  
  //region function command

  getSupportedVersion(bot, message) {
    bot.sendMessage(message.from, 'Unimplmented function !');
  }

  getIsSupportedVersion(bot, message) {
    bot.sendMessage(message.from, 'Unimplmented function !');
  }

  getGreeting(bot, message) {
    bot.sendMessage(message.from, 'Hi, there! It is nice to see you here!');
  }

  getProgress(bot, message) {
    const yearPercents = time.getYearProgress();
    const yearProgress = progress.makeProgressString(yearPercents);

    const monthPercents = time.getMonthProgress();
    const monthProgress = progress.makeProgressString(monthPercents);

    const dayPercents = time.getDayProgress();
    const dayProgress = progress.makeProgressString(dayPercents);

    const text =
      "Year:    " + yearProgress + " " + yearPercents + "%\n" +
      "Month: " + monthProgress + " " + monthPercents + "%\n" +
      "Day:     " + dayProgress + " " + dayPercents + "%\n";

    bot.sendMessage(message.from, text);
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