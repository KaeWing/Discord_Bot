const Discord = require('discord.js');

// const client = new Discord.Client();

const {Client, MessageAttachment} = require('discord.js');
const client = new Client();

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
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
});


// Laungh bot with token
client.login('ODI3MjgzODgxOTg3NjcwMDQ2.YGYyJw.vmmXHtiAQx94nzXblx_nYaebuP0');