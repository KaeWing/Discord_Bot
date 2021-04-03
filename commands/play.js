const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: "Play an audio with a youtube link",
    async execute(message, args) {

        const voiceChannel = message.member.voice.channel;

        // Check if user is in a voice channel first
        if(!voiceChannel) return message.channel.send('You need to be in a voice channel to execute this command');

        // Check if user has permissions
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.channel.send('You dont have permissions');
        if(!permissions.has('SPEAK')) return message.channel.send('You dont have permissions');

        if(!args.length) return message.channel.send('You need to send a link');
        
        // Joins voice channel
        const connection = await voiceChannel.join();

        // Search for the youtube link with keywords
        const videoFinder = async (query) => {

            // Get list of possible youtube videos
            const videoResult = await ytSearch(query);
            // Only get the first youtube video, if there is more than one possible video
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        // Once we have the video
        if(video) {
            // Only get the audio
            const stream = ytdl(video.url, {filter: "audioonly"});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () => {
                voiceChannel.leave();
            });

            await message.reply(`Now playing ***${video.title}***`)
        } else {
            message.channel.send('Not video results found');
        }
    }
}