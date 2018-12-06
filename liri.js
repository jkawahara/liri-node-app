// *** REQUIRED MODULES

// Read environment specific variables (process.env)
// Assign axios package to var axios
// Assign moment package to var moment
// Assign spotify package to var Spotify
// Assign exports object (keys.js) to var keysAPI
// Assign fs package to var fs


// *** DECLARE GLOBAL VARIABLES:

// Assign command line arguments (process.argv[2], [3]) to var queryRequest[0], [1]
  // process.argv[2] arguments: "concert-this", "spotify-this-song", "movie-this" or "do-what-it-says" 
    // process.argv[3] arguments: artist/band name, song name, movie name or null, respectively

// Assign new Spotify { id: client id, secret: client secret } to var spotify 
    

// *** DECLARE FUNCTIONS
// function bandsInTown(queryStr) {}
  // Request artist events info (Bandsintown API) using axios.get().then(function(){}).catch(function(){}) promise
    // Request URL "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  // Render to terminal: venue.name str, venue.city str & venue.region str, moment(datetime str).format("MM/DD/YYYY")
  // Call logData(queryRequest[0], queryRequest[1], response

// function spotify(queryStr) {}
  // Request song info (Spotify API) using spotify.search({}).then(function(){}).catch(function(err){}) promise
    // If queryRequest[1] does not equal null then
      // Search object { type: 'track', query: song name}
    // Else
      // Search object { type: 'track', query: 'The Sign'}
  // Render to terminal: track.artists {}, track.name str, track.preview_url str, track.album {}
  // Call logData(queryRequest[0], queryRequest[1], response)

// function omdb(queryStr) {}
  // Request movie info (OMDb API) using axios.get().then(function(){}).catch(function(){}) promise
    // If queryRequest[1] does not equal null then
      // Request URL "http://www.omdbapi.com/?t=" + movie name + ?apikey=trilogy"
    // Else
      // Request URL "http://www.omdbapi.com/?t=" + 'Mr. Nobody.' + ?apikey=trilogy"
  // Render to terminal: Title str, Released str, imdbRating str, Ratings[1].Value, Country, Language, Plot, Actors
  // Call logData(queryRequest[0], queryRequest[1], response

// function logData(queryType, queryStr, response) {}
  // Append to log.txt file (FS module) using fs.appendFile({})

  
// *** MAIN CONTROLLER

// If queryRequest[0] equals "concert-this" then call bandsInTown(queryRequest[1])
  
// If queryRequest[0] equals "spotify-this-song" then call spotify(queryRequest[1])

// If queryRequest[0] equals "movie-this" then call omdb(queryRequest[1])

// If queryRequest[0] equals "do-what-it-says" then
  // Read random.txt file (FS module) using fs.readFile({})
    // Assign csv data to var queryRandom []
  // If queryRandom[0] equals "concert-this" then call bandsintown(queryRandom[1])
  // If queryRandom[0] equals "spotify-this-song" then call spotify(queryRandom[1])
  // If queryRandom[0] equals "movie-this" then call omdb(queryRandom[1])
