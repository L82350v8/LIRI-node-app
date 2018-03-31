// ===============================< environment variables >==================================== //
require("dotenv").config();
var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var keys = require('./keys.js');

// =================================< global variables >======================================= //      
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var nodeArgs = process.argv;
var logStmt = "";

// =================================< functions >============================================== // 
function processNodeCmd(args) {
  var cmd = args[2];
  // identify and execute the requested command.
  switch (cmd) {
    case "my-tweets":
      myTweets(args);
      break;
    case "spotify-this-song":
      spotifyThisSong(args);
      break;
    case "movie-this":
      movieThis(args);
      break;
    case "do-what-it-says":
      doWhatItSays(args);
      break;
    default:
      console.log("liri.js command line error encountered! Unable to identify a LIRI command.")
  }
}

function myTweets(tweetArgs) {
  var screenName = client.options.screen_name;
  var searchNameObj = { q: screenName };
  // use the twitter for nodejs package to make GET requests against the twitter api.
  client.get('search/tweets', searchNameObj, function (error, tweets, response) {
    if (error) {
      console.log(error);
      return error;
    }
    else {
      logStmt = ("----------------------------------------------------------------------------------------------------------------------");
      appendToLog(logStmt);
      logStmt = ("Node arguments passed are: ");
      appendToLog(logStmt);
      logStmt = tweetArgs;
      appendToLog(logStmt);
      logStmt = ("Twitter tweets for screen name " + screenName + " are: ");
      appendToLog(logStmt);

      var nbrOfTweetsFound = tweets.statuses.length;

      if (tweets.statuses.length === 0) {
        logStmt = ("No tweets were found for this screen name.");
        appendToLog(logStmt);
      }
      else {
        for (a in tweets.statuses) {
          // only display and log the first 20 tweets.
          if (a > 19) {
            break
          }
          else {
            logStmt = ("-----------------------------------< tweet " + (parseInt(a) + 1) +
              " of " + nbrOfTweetsFound + " >------ was created on: " + tweets.statuses[a].created_at);
            appendToLog(logStmt);
            logStmt = tweets.statuses[a].text
            appendToLog(logStmt);
          }
        }
      }
    }
  });
}

function movieThis(movieArgs) {
  var movie = "";
  // if no movie name was given, assign a default movie name. 
  if (movieArgs.length < 4) {
    movie = "Mr" + "+" + "Nobody";
  }
  // if movie name consists of more than 1 word, concatenate the words of the movie. 
  else {
    for (var i = 3; i < movieArgs.length; i++) {
      if (i > 3 && i < movieArgs.length) {
        movie = movie + "+" + movieArgs[i];
      }
      // if movie name is only 1 word or if movie name was entered within quotes, assign it to movie variable. 
      else {
        movie += movieArgs[i];
      }
    }
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  // use the nodejs package request to call the omdb api. 
  request(queryUrl, function (error, response, body) {
    if (error) {
      console.log("Error on call to omdbapi.com. The error message is " + error);
    }
    // write the returned data to the console and to the log.txt file. 
    else if (response.statusCode === 200) {
      logStmt = ("----------------------------------------------------------------------------------------------------------------------");
      appendToLog(logStmt);
      logStmt = ("Node arguments passed are: ");
      appendToLog(logStmt);
      logStmt = movieArgs;
      appendToLog(logStmt);
      logStmt = ("                 Title: " + JSON.parse(body).Title);
      appendToLog(logStmt);
      logStmt = ("                  Year: " + JSON.parse(body).Year);
      appendToLog(logStmt);
      logStmt = ("           IMDB Rating: " + JSON.parse(body).imdbRating);
      appendToLog(logStmt);
      logStmt = ("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      appendToLog(logStmt);
      logStmt = ("Country where produced: " + JSON.parse(body).Country);
      appendToLog(logStmt);
      logStmt = ("              Language: " + JSON.parse(body).Language);
      appendToLog(logStmt);
      logStmt = ("                  Plot: " + JSON.parse(body).Plot);
      appendToLog(logStmt);
      logStmt = ("                Actors: " + JSON.parse(body).Actors);
      appendToLog(logStmt);
    }
  });
}

function spotifyThisSong(songArgs) {
  var song = "";
  // if no song was specified, assign the default song.
  if (songArgs.length < 4) {
    song = "The" + "+" + "Sign";
  }
  // if song consists of more than 1 word, concatenate the words of the song. 
  else {
    for (var i = 3; i < songArgs.length; i++) {
      if (i > 3 && i < songArgs.length) {
        song = song + "+" + songArgs[i];
      }
      // if song is only 1 word or if song name was entered within quotes, assign it to song variable. 
      else {
        song += songArgs[i];
      }
    }
  }
  // add double quotes around the song name to prep for query.
  song = "\"" + song + "\"";
  // use the node spotify api package to search for requested tracks. Only show the first 3 songs that are returned.
  spotify.search({ type: 'track', query: song, limit: 3 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    logStmt = ("----------------------------------------------------------------------------------------------------------------------");
    appendToLog(logStmt);
    logStmt = ("Node arguments passed are: ");
    appendToLog(logStmt);
    logStmt = songArgs;
    appendToLog(logStmt);

    if (data.tracks.items.length === 0) {
      logStmt = ("No tracks were found for the song " + song + ". Please try another song.");
      appendToLog(logStmt);
    }
    // write the returned data to the console and to the log.txt file. 
    else {
      for (a in data.tracks.items) {
        logStmt = ("-----------------------------------< song " + (parseInt(a) + 1) + " of 3 >------");
        appendToLog(logStmt);
        logStmt = ("The song's name: " + data.tracks.items[a].name);
        appendToLog(logStmt);
        logStmt = ("From the album: " + data.tracks.items[a].album.name);
        appendToLog(logStmt);

        for (b in data.tracks.items[a].artists) {
          logStmt = ("Performed by the artist(s): " + data.tracks.items[a].artists[b].name);
          appendToLog(logStmt);
        }
        if (data.tracks.items[a].preview_url) {
          logStmt = ("Preview link to this song: " + data.tracks.items[a].preview_url);
          appendToLog(logStmt);
        }
        else {
          logStmt = ("Preview link to this song: < no preview link available >");
          appendToLog(logStmt);
        }
      }
    }
  });
}

function doWhatItSays(nodeArgs) {
  // write out the original node command that was received.
  logStmt = ("----------------------------------------------------------------------------------------------------------------------");
  appendToLog(logStmt);
  logStmt = ("Node arguments passed are: ");
  appendToLog(logStmt);
  logStmt = nodeArgs;
  appendToLog(logStmt);
  // read the random.txt file to obtain a random liri command.
  fs.readFile("random.txt", "utf8", function (error, randomTxtString) {
    if (error) {
      return console.log(error);
    }
    // convert the random liri command from a string into an array.
    var cnvStringToArr = randomTxtString.split(",");
    var doWhatItSaysArgs = [];
    // build a new doWhatItSaysArgs array to process the new random liri command. 
    doWhatItSaysArgs.push(nodeArgs[0]);
    doWhatItSaysArgs.push(nodeArgs[1]);
    doWhatItSaysArgs.push(cnvStringToArr[0]);
    doWhatItSaysArgs.push(cnvStringToArr[1]);
    // call the processNodeCmd function using the doWhatItSaysArgs array to process the random request. 
    processNodeCmd(doWhatItSaysArgs);
  });
}

function appendToLog(logStmt) {
  // write passed statements to the console.
  console.log(logStmt);
  // write passed statements to the log.txt file.
  fs.appendFileSync('log.txt', '\n' + logStmt, function (err) {
    if (err) throw err;
  });
}
// =================================< main process >========================================== // 
processNodeCmd(nodeArgs);
