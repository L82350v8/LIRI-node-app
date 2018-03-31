# LIRI-node-app

LIRI is a Language-based Interpretation and Recognition Interface that uses a command line node app to process requests that are sent from the user's Command Prompt terminal. 

The LIRI application can show you information about: 
 * your last 20 tweets from Twitter. 

 * a song from Spotify.
    - Artist(s) who performed the song. 
    - The song's name.
    - A preview url link of the song from Spotify.
    - The album of the song. 

* a movie from OMDB. 
    - The title of the movie.
    - The Year the movie came out.
    - the IMDB rating of the movie. 
    - The Rotten Tomatoes rating of the movie. 
    - The country where the movie was produced. 
    - The language of the movie. 
    - The plot of the movie.
    - The actors in the movie.

When instructed, LIRI can also process requests that are read from a text file. 


To retrieve the data that will power this app, you'll need to send requests to the Twitter, Spotify and OMDB APIs. You'll find these Node packages crucial for using this app. 
   * [Twitter](https://www.npmjs.com/package/twitter)
   * [Spotify](https://www.npmjs.com/package/node-spotify-api)
   * [Request](https://www.npmjs.com/package/request)
     - You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).
   * [DotEnv](https://www.npmjs.com/package/dotenv)

### Setup Instructions

1. Open your Command Prompt terminal and navigate to your cloned project folder. Run the command line `npm install` to add the above referenced node.js packages.

2. Make a .gitignore file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.

node_modules
.DS_Store
.env

3. Make a JavaScript file named `keys.js`.

* Inside your keys.js, your file will look like this:

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  screen_name: process.env.TWITTER_SCREEN_NAME,
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

4. Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes or semi-colons) once you have them:

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
TWITTER_SCREEN_NAME=your-twitter-screen-name

* This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github - keeping our API key information private.

* Users that want to clone this app from GitHub need to supply their own `.env` file for it to work.

5. Get your Twitter API keys by following these steps:

   * Step One: Visit <https://apps.twitter.com/app/new>
   
   * Step Two: Fill out the form with your user data. Don't fill out the Callback URL input. Submit the form.
   
   * Step Three: On the next screen, click the Keys and Access Tokens tab to get your consumer key and secret. 
     
     * Copy and paste them into your .env file, replacing the `your-twitter-consumer-key` and `your-twitter-consumer-secret` placeholders.
     * populate the `your-twitter-screen-name` with your Twitter screen name within the .env file. 
   
   * Step Four: At the bottom of the page, click the `Create my access token` button to get your access token key and secret. 
     
     * Copy the access token key and secret displayed at the bottom of the next screen. Paste them into your .env file, replacing the placeholders for `your-twitter-access-token-key` and `your-twitter-access-token-secret`.

6. Visit http://www.omdbapi.com/apikey.aspx to create an API key for the OMDB API. 

7. Make a file called `random.txt`.

   * Inside of `random.txt` put the following in with no extra characters or white space:
     
     * spotify-this-song,"I Want it That Way"

8. Visit <https://developer.spotify.com/my-applications/#!/>
   
9. Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

10. Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. When finished, click the "complete" button.

11. On the next screen, scroll down to where you see your client id and client secret. Copy these values and paste them into your `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` values within the .env file.

### To use the LIRI application:

1. Open your Command Prompt terminal and navigate to your project folder. Then, type one of the following node.js LIRI commands: 


* `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

* `node liri.js spotify-this-song '<song name here>'`

   * This will show information about the song in your terminal/bash window.

   * If no song is provided then the application will default to "The Sign" by Ace of Base.

* `node liri.js movie-this '<movie name here>'`

   * This will output information about the movie to your terminal/bash window.
     
   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

* `node liri.js do-what-it-says`
   
   * LIRI will read the text inside of random.txt and use it to call LIRI.
     
     * As a default, the app should run `spotify-this-song` for "I Want it That Way," as it follows the text in `random.txt`.
        
This project was developed by a student learning how to incorporate the use of node.js and JavaScript to create a back-end server side application. 

This application also uses npm packages, authentications, and API calls.  

This project is very useful because the developer gained experience working with node.js and server-side programming concepts. 

Currently, only the original developer maintains and contributes to this project.
     
