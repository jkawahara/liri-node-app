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

// function bandsInTown(queryStr) {}
function requestEvents(queryStr) {
  axios.get('https://rest.bandsintown.com/artists/' + queryStr + '/events?app_id=' + bands_app_id)
  .then(function (response) {
    console.log('\n\"' + queryStr + '\"' + ' event query:');

    // Append to log.txt
    logData('\n\"' + queryStr + '\"' + ' event query:');
    
    for (var i = 0; i < response.data.length; i++) {
      console.log(
        moment(
          response.data[i].datetime).format('MM/DD/YYYY') + ' - ' + 
        response.data[i].venue.name + ' in ' + 
        response.data[i].venue.city + ' ' + 
        response.data[i].venue.country
      );

      // Append to log.txt
      logData(
        moment(
          response.data[i].datetime).format('MM/DD/YYYY') + ' - ' + 
        response.data[i].venue.name + ' in ' + 
        response.data[i].venue.city + ' ' + 
        response.data[i].venue.country
      );
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

// function spotify(queryStr) {}
function requestSong(queryStr) {
  spotify.search({ type: 'track', query: queryStr, limit: 3 })
  .then(function(response) {
    console.log('\n\"' + queryStr + '\"' + ' song query:');
    
    // Append to log.txt
    logData('\n\"' + queryStr + '\"' + ' song query:')
    for (var i = 0; i < response.tracks.items.length; i++) {
      console.log(
        'Result ' + (i + 1) + ':\n' +
        'Artist(s): '
        );

      // Append to log.txt
      logData(
        'Result ' + (i + 1) + ':\n' +
        'Artist(s): '
      );
      for (var j = 0; j < response.tracks.items[i].artists.length; j++) {
        console.log('-' + response.tracks.items[i].artists[j].name);

        // Append to log.txt
        logData('-' + response.tracks.items[i].artists[j].name);
      }
      console.log(
        'Song: ' + response.tracks.items[i].name + '\n' +
        'Preview Link: ' + response.tracks.items[i].album.external_urls.spotify + '\n' +
        'Album: ' + response.tracks.items[i].album.name
      );

      // Append to log.txt
      logData(
        'Song: ' + response.tracks.items[i].name + '\n' +
        'Preview Link: ' + response.tracks.items[i].album.external_urls.spotify + '\n' +
        'Album: ' + response.tracks.items[i].album.name
      );
    }
  })
  .catch(function(error) {
    console.log(error);
  })
}

// function omdb(queryStr) {}
function requestMovie(queryStr) {
  axios.get('http://www.omdbapi.com/?t=' + queryStr + '&y=&plot=short&apikey=' + omdb_app_key).then(function(response) {
    console.log(
      '\n\"' + queryStr + '\"' + ' movie query:\n' +
      'Title: ' + response.data.Title + '\n' +
      'Year: ' + response.data.Year + '\n' +
      'IMDB Rating: ' + response.data.imdbRating + '\n' +
      'Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value + '\n' +
      'Countries: ' + response.data.Country + '\n' +
      'Language: ' + response.data.Language + '\n' +
      'Short Plot: ' + response.data.Plot + '\n' +
      'Actors: ' + response.data.Actors
    );

    // Append to log.txt
    logData(
      '\n\"' + queryStr + '\"' + ' movie query:\n' +
      'Title: ' + response.data.Title + '\n' +
      'Year: ' + response.data.Year + '\n' +
      'IMDB Rating: ' + response.data.imdbRating + '\n' +
      'Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value + '\n' +
      'Countries: ' + response.data.Country + '\n' +
      'Language: ' + response.data.Language + '\n' +
      'Short Plot: ' + response.data.Plot + '\n' +
      'Actors: ' + response.data.Actors
    );
  })
  .catch(function(error) {
    console.log(error);
  });
}

// function logData(queryType, queryStr, response) {}
function logData(text) {
  fs.appendFile('log.txt', text + '\n', function(error) {
    if (error) {
      console.log(error);
    }
  }) 
}
  

// *** MAIN CONTROLLER

// If queryRequest[0] equals 'concert-this' then call requestEvents(queryRequest[1])
if (queryRequest[0] === 'concert-this') {
  requestEvents(queryRequest[1]);
}

// If queryRequest[0] equals 'spotify-this-song' then call requestSong(queryRequest[1])
if (queryRequest[0] === 'spotify-this-song') {
  if (queryRequest[1] === undefined) {
    requestSong('The Sign by Ace of Base')
  } else {
    requestSong(queryRequest[1]);
  }
}

// If queryRequest[0] equals 'movie-this' then call requestMovie(queryRequest[1])
if (queryRequest[0] === 'movie-this') {
  if (queryRequest[1] === undefined) {
    requestMovie('Mr. Nobody')
  } else {
    requestMovie(queryRequest[1]);
  }
}

// If queryRequest[0] equals 'do-what-it-says then
if (queryRequest[0] === 'do-what-it-says') {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) {
      console.log(error);
    } else {
      var queryArray = data.trim().split(",");
      queryArray[1] = queryArray[1].substr(1, queryArray[1].length - 2);
      
      switch (queryArray[0]) {
        case 'concert-this':
          requestEvents(queryArray[1]);
          break;
        case 'spotify-this-song':
          requestSong(queryArray[1]);
          break;
        case 'movie-this':
          requestMovie(queryArray[1]);
          break; 
      }
    }
  }) 
}
