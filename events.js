const discord = require("discord.js");
const DisTube = require('distube').default;
const { MessageEmbed } = require('discord.js');
/**
 * @param {Client} client
 * @param {Client} distube
 */
module.exports = async (Client , distube) =>{

    distube.on("playSong", (Queue, Song) => {
        Queue.textChannel.send({
            embeds : [
                new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`<a:music:990310043322826792> playing \`${Song.name}\``)
                .setURL(`${Song.url}`)
                .setFooter(`code by Anirban Gaming`)
            ]
        })
    });
}