const Discord = require("discord.js");
const config = require("./config.json").embed;


function createMessage() {
    var embed = new Discord.RichEmbed()
        .setTitle(config.title)
        .setAuthor(config.author.name, config.author.image)
        .setFooter(config.footer.text);
        //.setFooter(config.footer.text, config.footer.image);
        //.setThumbnail(config.thumbnail_image);

    return embed;
}

module.exports = {
    printDiceRoll: function (rollResult, msg) {

        var rollMessage = null;

        if (rollResult.sucess) {
            rollMessage = config.sucess;
        }
        else if (rollResult.botch) {
            rollMessage = config.botch;
        }
        else {
            rollMessage = config.fail;
        }

        var embed = createMessage();
        embed.setDescription(rollMessage.message + "[" + rollResult.rolls.join(" ") + "]");
        embed.setColor(rollMessage.color);

        msg.channel.send({ embed });
    },
    printSheet: function(name, msg){
        var embed = new Discord.RichEmbed()
            .setTitle('Sheet');
        
        embed.addField("Força","○○○○●", true);
        embed.addField("Dextreza","○○○○●", true);
        embed.addField("Vigor","○○○○●", true);
        embed.addBlankField(false);

        embed.addField("Força","○○○○●", true);
        embed.addField("Dextreza","○○○○●", true);
        embed.addField("Vigor","○○○○●", true);
        embed.addBlankField(false);

        embed.addField("Força","○○○○●", true);
        embed.addField("Dextreza","○○○○●", true);
        embed.addField("Vigor","○○○○●", true);
        embed.addBlankField(false);

        msg.channel.send({ embed });
    }
}