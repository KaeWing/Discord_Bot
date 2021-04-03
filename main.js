const Discord = require('discord.js');

// const client = new Discord.Client();

const {Client, Attachment} = require('discord.js');
//const {Client, MessageAttachment} = require('discord.js');
const client = new Client();

const token = 'ODI3MjgzODgxOTg3NjcwMDQ2.YGYyJw.vmmXHtiAQx94nzXblx_nYaebuP0';

const prefix = '-'

const fs = require('fs');

client.commands = new Discord.Collection();

// Get list of commands from the command folder and make sure the files are javascript
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
// Loop through all the files
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('KaeBot is online');
});

client.on('message', message => {

    // If bot does not start with prefix or the message is from the bot, do nothing
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    // Slice prefix from message
    const args = message.content.slice(prefix.length).split(/ +/);
    // Shift skips the first item of the item, in this case '-' to isolate the command
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }

    if(command === 'sloth') {
        client.commands.get('sloth').execute(message, args);
    }

    if(command == 'slothtie') {
        client.commands.get('slothtie').execute(message, args);
    } 

    // For this to work, had to install ffmpeg with: npm install @discordjs/opus ffmpeg-static yt-search ytdl-core 
    if(command === 'play') {
        client.commands.get('play').execute(message, args);
    }

    if(command === 'leave') {
        client.commands.get('leave').execute(message, args);
    }

});


// Launch bot with token
client.login(token);