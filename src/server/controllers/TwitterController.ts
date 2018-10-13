const Twitter = require('twitter');
const {consumer_key, consumer_secret, access_token_key, access_token_secret} = require('../../config/config').twitter_config;

/**
 * The TwitterAPIController is instantiated in SocketController.ts and is passed a socket as a parameter.
 * Whenever a tweet is recieved in the listenToTwitterFeed method, it emits an event to the client via socket with the tweet.
 */
export class TwitterAPIController {
    constructor() {}
    private client = new Twitter({
        consumer_key,
        consumer_secret,
        access_token_key,
        access_token_secret
    });
    public listenToTwitterFeed(socket?: any) {
        this.client.stream('statuses/filter', {track: 'javascript'/*filters all tweets with keyword 'javascript' */}, (stream: any) => {
            console.log('Streaming tweets...');
            stream.on('data', (tweet: any) => {
                socket.emit('tweet', {payload: tweet});
                console.log(Object.keys(tweet));
            });
            stream.on('error', (error: any) => {
                console.log(error);
            });
        });
    }
}
