module.exports = {
    name: 'leave',
    description: 'Stop the bot and leave the voice channel',
    async execute(message, args) {

        const voiceChannel = message.member.voice.channel;

        // Check if user is in a voice channel first
        if(!voiceChannel) return message.channel.send('You need to be in a voice channel to execute this command');

        await voiceChannel.leave();
        await message.channel.send('Leaving voice channel')
    }
}