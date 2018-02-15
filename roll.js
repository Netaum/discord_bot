const Discord = require("discord.js");
const config = require("./config.json").embed;

const embed = new Discord.RichEmbed()
    .setTitle(config.title)
    .setAuthor(config.author.name, config.author.image)
    .setFooter(config.footer.text, config.footer.image)
    .setThumbnail(config.thumbnail_image);


function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.run = (client, message, args) => {
    var diceNumber = args[1];
    var diceType = args[2];

    var diceDifficulty = 6;
    if(args.length > 3){
        diceDifficulty = args[4];
    }

    var rolls = [];
    var sucesses = [];
    var criticals = [];
    var fails = [];
    var botches = [];

    for(var i = 0; i < diceNumber; i++){
        var currentRoll = randomInt(1, diceType);
        rolls.push(currentRoll);

        if(currentRoll == 1){
            botches.push(currentRoll);
        }

        if(currentRoll < diceDifficulty){
            fails.push(currentRoll);
            continue;
        }

        sucesses.push(currentRoll);

        if(currentRoll == diceType){
            criticals.push(currentRoll);
        }
    }

    var totalSucesses = sucesses.length - botches.length;
    var rollMessage = null;

    if(totalSucesses > 0){
        rollMessage = config.sucess;
    }
    else if(sucesses.length == 0 && botches.length > 0){
        rollMessage = config.botch;
    }
    else{
        rollMessage = config.fail;
    }
   
    embed.setDescription(rollMessage.message + "[" + rolls.join(" ") + "]");
    embed.setColor(rollMessage.color);
    message.channel.send({embed});
};