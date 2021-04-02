const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'sloth',
    description: "Send a sloth pic!",
    execute(message, args) {
        const attachment = new MessageAttachment('https://i.pinimg.com/originals/05/d9/83/05d98334691a4f573aa9c0e83bfc1d70.jpg');
        message.channel.send(attachment);
    }
}