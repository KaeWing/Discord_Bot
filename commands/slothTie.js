const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'slothtie',
    description: "Send a sloth with a tie pic!",
    execute(message, args) {
        // Send an image stored locally
        const attachment = new MessageAttachment('./images/slothfull.jpg');
        message.channel.send(attachment);
    }
}