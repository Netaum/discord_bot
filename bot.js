const Discord = require("discord.js");
const client = new Discord.Client();

const rollObject = require("./roll.js");
const printObject = require("./print.js");
const config = require("./config.json");

const regRollCommand = /r(?:oll)?\s*(\d{1,2})d(\d{1,2})(\s*\>\s*(\d{1,2}))?/;
const regPrintCommand = /^p(?:rint)$/

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  var content = msg.content;

  if (!content.startsWith(config.prefix) || msg.author.bot) {
    return;
  }

  var args = content.slice(config.prefix.length).trim();
  var roll = args.match(regRollCommand);
  var print = args.match(regPrintCommand);

  if (roll != null) {
    try {
      rollObject.rollDice(roll, (rollResult) => {
        printObject.printDiceRoll(rollResult, msg);
      });
    } catch (err) {
      console.log(err);
    }
  }

  if(print != null){
    try {
      printObject.printSheet("name", msg);
    } catch (err) {
      console.log(err);
    }
  }
});

var testMessage = {
  "content": "/roll 3d10 > 10",
  "author": {
    "bot": false
  },
  "channel": {
    "send": function (str) {
      console.log(str);
    }
  }
};

//client.emit("message",testMessage);

client.login(config.token);