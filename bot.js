//``
const discord = require('discord.js')
const DisTube = require('distube').default;
const config = require('./config.json');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const client = new discord.Client({
    intents: 641
});

let distube = new DisTube(client, {
    emitNewSongOnly: false,
    searchSongs: 0,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: true,
});

client.on("ready", () => {
    console.log(`${client.user.username} is  online`);
    client.user.setActivity(`${config.prefix}Help || Anirban Gaming... `)

    // require('./events')(client,distube)


});




//envent distube
// distube.on("playSong", (Queue, Song) => {
//     Queue.textChannel.send(`🎵 playing \`${Song.name}\``)
// });
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

distube.on('addSong', (Queue, song) => {
    Queue.textChannel.send({
        embeds : [
            new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`<a:music:990310043322826792>Added to Quere \`${song.name}\` \n \`${song.formattedDuration}\``)
            .setURL(`${song.url}`)
            .setFooter(`code by Anirban Gaming`)
        ]
    }
        
    )
})



client.on('messageCreate', async (Message) => {
    if (
        !Message.guild ||
        Message.author.bot ||
        !Message.content.startsWith(config.prefix)
    )
        return;

    let args = Message.content.slice(config.prefix.length).trim().split(" ");
    let cmd = args.shift()?.toLowerCase();
    if (cmd === "ping") {
        let embedsping = new MessageEmbed()
            .setDescription(`>>> ping:- ${client.ws.ping}ms`)
            .setColor('RED')
        Message.channel.send({ embeds: [embedsping] })
    } else if (cmd === "play") {
        let search = args.join(" ");
        let channel = Message.member.voice.channel;
        let Quere = distube.getQueue(Message.guildId);
        if (!channel) {
            return Message.reply(`>>> please join a voice voice ckannel`)
        }
        if (!search) {
            return Message.reply(`>>> please provide me song name of link`)
        }
        distube.play(Message, search);

    } else if (cmd === "skip") {
        let Quere = distube.getQueue(Message.guildId);
        if (!Message.guild.me.voice.channel) {
            return Message.reply('>>> Nothing Playing')
        }
        Quere.skip()
    }  else if(cmd === "volume"){
        let amount = parseInt(args[0])
        let Quere = distube.getQueue(Message.guild.id);
        if (!amount) {
            return Message.reply('>>> please provide me Volume')
        }
        Quere.setVolume(amount)
        Message.channel.send(`>>> Volume set to ${amount}`);
    }  else if(cmd === "stop"){
       let voiceChannel = Message.member.voice.channel;
       let Quere = distube.getQueue(Message.guildId);
        if (!Message.guild.me.voice.channel) {
            return Message.reply('>>> Nothing Playing')
        }
        Quere.stop().then((s)=>{
            Message.reply(`✔ Song Stoped`)
        })
    }

})
client.login(token)
