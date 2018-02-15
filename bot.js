const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const reg = /r(?:oll)?\s*(\d{1,2})d(\d{1,2})(\s*\>\s*(\d{1,2}))?/;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  var content = msg.content;

  if(!content.startsWith(config.prefix) || msg.author.bot){
    return;
  }

  var args = content.slice(config.prefix.length).trim();
  var roll = args.match(reg);

  if(roll != null){
    try{
      let rollCommand = require("./roll.js");
      rollCommand.run(client, msg, roll);
    }catch(err){
      console.log(err);
    }
  }
});

var testMessage = {
  "content" : "/roll 3d10 > 10",
  "author" : {
    "bot" : false
  },
  "channel" :{
    "send": function(str){
      console.log(str);
    }
  }
};

client.emit("message",testMessage);

//client.login(config.token);