import Time from "../services/time";
import Progress from "../services/progress";

const time = new Time();
const progress = new Progress();

export default class Command {
  constructor() {
    this.commandMapping = {
      progress: {
        string: "/progress",
        function: this.getProgress,
      },
      start: {
        string: "/start",
        function: this.getGreeting,
      },
      default: {
        string: "/help",
        function: this.getHelp,
      },
    }
  }

  processCommand(bot, message){
    var commandString = this.mapToCommand(message);
    if (commandString) {
      return this.commandMapping[commandString].function(bot, message);
    } else {
      return this.commandMapping["default"].function(bot, message);
    }
  }

  mapToCommand(message){
    var commandMapping = this.commandMapping;
    var arrayText = message.text.split(" ");
    for (var key in commandMapping) {
      if (arrayText[0] && arrayText[0].match(commandMapping[key])) {
        return key;
      }
    }
    return null;
  }
  
  //region function command

  getGreeting(bot, message) {
    bot.sendMessage(message.from, 'Hi, there! It is nice to see you here, ${message.user.firstName} !');
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
    bot.sendMessage(message.from, 'Call the /progress to see how much time you waste');
  }
  //endregion
}
