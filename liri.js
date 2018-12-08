// *** REQUIRED MODULES

// Read environment specific variables (process.env)
require('dotenv').config();
// Assign axios package to var axios
var axios = require('axios');
// Assign moment package to var moment
var moment = require('moment');
// Assign spotify package to var Spotify
var Spotify = require('node-spotify-api');
// Assign exports object (keys.js) to var keysAPI
var keys = require('./keys.js');
// Assign fs package to var fs
var fs = require('fs');


// *** DECLARE GLOBAL VARIABLES:

// Assign command line arguments (process.argv[2], [3]) to var queryRequest[0], [1]
  // process.argv[2] arguments: 'concert-this', 'spotify-this-song', 'movie-this' or 'do-what-it-says' 
  // process.argv[3] arguments: artist/band name, song name, movie name or null, respectively
var queryRequest = process.argv.slice(2);

// Assign Bandsintown app_id to var bands_app_id
var bands_app_id = keys.bandsintown;

// Assign new Spotify { id: client id, secret: client secret } to var spotify 
var spotify = new Spotify(keys.spotify);

// Assign OMDb app_key to var omdb_app_key
var omdb_app_key = keys.omdb;


// *** DECLARE FUNCTIONS

// Search venue information requestEvents()
function requestEvents(artistName) {
  // Use default artis if not entered
  if (artistName === '') {
    artistName = 'Foo Fighters';
    console.log('Using default artist name: ' + artistName);
  }
  // Structure query URL per Bandsintown API
  var queryURL = 'https://rest.bandsintown.com/artists/' + artistName + '/events?app_id=' + bands_app_id;
  // Get data request using Axios client
  axios.get(queryURL)
  .then(function (response) {
    // Assign response to variable for shorter reference
    var dataJSON = response.data;
    // Notify user if no results
    if (!dataJSON.length) {
      console.log('No results found for ' + artistName + '.');
      return;      
    }
    // Store show information in array for logging
    var showLog = [];
    showLog.push('Upcoming events:');
    // Iterate thru response data
    for (var i = 0; i < dataJSON.length; i++) {
      var show = dataJSON[i];
      showLog.push(
        moment(show.datetime).format('MM/DD/YYYY') + ' - ' + 
        show.venue.name + ' in ' + 
        show.venue.city + ' ' + 
        show.venue.country
      );
    }
    // Log for user in terminal and log.txt
    console.log(showLog.join('\n'));
    writeToFile(showLog.join('\n'));
  })
  // Error handler 
  .catch(function (error) {
    console.log(error);
  });
}

// Helper function to get artist name for requestSong()
function getArtistNames(artist) {
  return ' ' + artist.name;
};

// Search song information requestSong()
function requestSong(songName) {
  // Use default song if not entered
  if (songName === '') {
    songName = 'The Sign by Ace of Base';
    console.log('Using default song name: ' + songName);
    
  }
  // Search data request using Spotify API
  spotify.search({ type: 'track', query: songName, limit: 3 })
  .then(function(response) {
    // Assign response to variable for shorter reference
    var dataJSON = response.tracks.items;
    // Notify user if no results
    if (!dataJSON.length) {
      console.log('No results found for ' + songName + '.');
      return;      
    }
    // Store song information in array for logging
    var songLog = [];
    songLog.push('Song information:');    
    // Iterate thru response data
    for (var i = 0; i < dataJSON.length; i++) {
      songLog.push(
        'Result ' + (i + 1) + ':\n' +
        'Artist(s):' + dataJSON[i].artists.map(getArtistNames) + '\n' + // map() to extract array
        'Song: ' + dataJSON[i].name + '\n' +
        'Preview Link: ' + dataJSON[i].album.external_urls.spotify + '\n' +
        'Album: ' + dataJSON[i].album.name
      );
    }
    // Log for user in terminal and log.txt
    console.log(songLog.join('\n'));
    writeToFile(songLog.join('\n'));
  })
  // Error handler 
  .catch(function(error) {
    console.log(error);
  })
}

// Search movie information requestMovie()
function requestMovie(movieName) {
  // Use default movie if not entered
  if (movieName === '') {
    movieName = 'Mr. Nobody';
    console.log('Using default movie name: ' + movieName);
  }
  // Structure query URL per OMDb API
  var queryURL = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=' + omdb_app_key;
  // Get data request using Axios client
  axios.get(queryURL).then(function(response) {
    // Assign response to variable for shorter reference
    var dataJSON = response.data;
    // Notify user if no results
    if (dataJSON.Error === 'Movie not found!') {
      console.log('No results found for ' + movieName + '.');
      return;      
    }
    // Check if Rotten Tomatoes Rating exists
    if (dataJSON.Ratings[1] !== undefined) {
      var rotTomRating =  dataJSON.Ratings[1].Value;
    } else {
      rotTomRating = 'doesn\'t exist';
    }
    // Store movie information in variable for logging
    var movieLog = 
      'Movie information:' + '\n' +
      'Title: ' + dataJSON.Title + '\n' +
      'Year: ' + dataJSON.Year + '\n' +
      'IMDB Rating: ' + dataJSON.imdbRating + '\n' +
      'Rotten Tomatoes Rating: ' + rotTomRating + '\n' +
      'Countries: ' + dataJSON.Country + '\n' +
      'Language: ' + dataJSON.Language + '\n' +
      'Short Plot: ' + dataJSON.Plot + '\n' +
      'Actors: ' + dataJSON.Actors;
    // Log for user in terminal and log.txt
    console.log(movieLog);
    writeToFile(movieLog);
  })
  // Error handler 
  .catch(function(error) {
    console.log(error);
  });
}

// Write search results to log.txt writeToFile())
function writeToFile(text) {
  // Append search results to log.txt
  fs.appendFile('log.txt', JSON.stringify(text) + '\n', function(error) {
    // Error handler 
    if (error) {
      console.log('Error occurred: ' + error);
    }
  }) 
}

// Read random.txt and determine arguments readRandomFile()
function readRandomFile() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    // Error handler 
    if (error) {
      console.log('Error occurred: ' + error);
    } else {
      // Assign trimmed, split string to queryArray
      var queryArray = data.trim().split(',');
      // Remove surrounding quotations from second argument 
      queryArray[1] = queryArray[1].substr(1, queryArray[1].length - 2);
      console.log(queryArray);
      // Check number of arguments then pass arguments to searchType()
      if (queryArray.length === 2) {
        searchType(queryArray[0], queryArray[1]);
      } else if (queryArray.length === 1) {
        searchType(queryArray[0]);
      } else if (queryArray.length > 2) {
        console.log('More than 2 arguments in random.txt.');
      }
    }
  });
}

// Execute command searchType()
function searchType(queryType, queryText) {
  switch (queryType) {
    case 'concert-this':
      // Check if 'concert-this' then call requestEvents()
      requestEvents(queryText);
      break;
    case 'spotify-this-song':
      // Check if 'spotify-this-song' then call requestSong()
      requestSong(queryText);
      break;
    case 'movie-this':
      // Check if 'movie-this' then call requestMovie()
      requestMovie(queryText);
      break;
    case 'do-what-it-says':
      // Check if 'do-what-it-says then
      readRandomFile();
      break;
    default:
      console.log('LIRI doesn\'t understand that command...');
  }
}
  
// Read command line arguments readCL()
function readCL(argOne, argTwo) {
  searchType(argOne, argTwo);
}

// *** MAIN CONTROLLER

readCL(process.argv[2], process.argv.slice(3).join(' '));
