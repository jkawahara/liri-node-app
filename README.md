# Getting Started - LIRI Bot
### 1. Why / Background
  * This is Berkeley Coding Boot Camp (BCBC) week 6 homework assignment.
    * The BCBC curriculum generally focuses on JavaScript along with HTML/CSS, using the MERN (MongoDB, Express, React, Node) software stack, to teach web development skills across the client and server. 
  * The LIRI Bot is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and returns data.
    * LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

### 2. What / Objectives / User Stories
  * This project development, from design through deployment of the LIRI Bot application, used Node.js as the primary web development technology on the server side along with npm and APIs:
    * The following npm packages were used:
      * axios to get data from OMDb API and Bandsintown API
      * node-spotify-api: simple to use API library for the Spotify REST API
      * dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
      * moment: date library for parsing, validating, manipulating, and formatting dates
    * Additionally, the following APIs were used:
      * OMBDb API responds with movie information
      * Bandsintown API responds with a list of an artist’s events
      * Spotify Web API responds with JSON metadata about music artists, albums, and tracks
  * User Stories, by categorization:
    * Search
      * Bandsintown Artist Events for an artist and render event information to the terminal
      * Spotify for song and render song information to terminal
      * OMDb for movie and render movie information to terminal
    * Based on text within random.txt, run one of the previous mentioned searches
    * Log data to log.txt (Bonus) by appending, not overwriting, each command and search response

### 3. How / Design Description
  * The scope of the project fit well into [Agile methodology with Scrum and Kanban frameworks](https://en.wikipedia.org/wiki/Agile_software_development). Due to limited scope and non-group assignment, GitHub's built-in tools were not used to support project execution:
    * [Projects](https://github.com/jkawahara/liri-node-app/projects) Kanban board for documenting user stories and overall progress
    * [Issues](https://github.com/jkawahara/liri-node-app/issues) Issue tracking for user stories, features and bug report
  * Functionality - refer to [video of application user flow](https://drive.google.com/open?id=16iQI6kKTvrBC2asFz3wrkjkqELEfAwJ3):
    * Design Description
      * Run application if command is entered in terminal and call specific search modules based on command line arguments; Argument1 defines search type and argument2 defines string to search for
        * Command: node liri.js argument1 argument2
        * Relevant modules: main controller, readCL(), searchType()
      * General search description
        * Read in search string as parameter searchType() 
        * Use default search string if not entered as command line argument
        * Use specific npm package for data request; axios for artist events (Bandsintown API) or movie info (OMDb API), node-spotify-api for song info (Spotify REST API)
        * Read data response, formatted in JSON, and assign to (event/song/movie)Log variable, as an array or string depending on positioning of desired properties within data response object
        * Log to terminal and write to log.txt; if structure of desired property is an array, iterate thru array
          * Search Bandsintown Artist Events for an artist and render event information to the terminal
            * Command: node liri.js concert-this "artist/band name"
            * Response: venue name, venue location, event date "MM/DD/YYYY"
            * Relevant modules: requestEvents()
          * Search Spotify for song and render song information to terminal
            * Command: node liri.js spotify-this-song "song name"
              * If no song name is entered, then search for default "The Sign" by Ace of Base
            * Response: Artist(s), song name, preview link of Spotify song, album
            * Relevant modules: requestSong()
          * Search OMDb for movie and render movie information to terminal
            * Command: node liri.js movie-this "movie name"
              * If no movie name is entered, then search for default "Mr. Nobody"
            * Response: movie title, year, IMDb rating, Rotten Tomatoes rating, country, language, short plot, actors
            * Relevant modules: requestMovie()
      * Read text in random.txt and run one of the search modules. Contents of random.txt includes argument1 and argument2 per the following structure: argument1,"argument2"
        * Command: node liri.js do-what-it-says
          * Reads random.txt as array and executes the appropriate search
        * Relevant modules: readRandomFile()
      * Log data to log.txt by appending, not overwriting, each command and search response
        * Relevant modules: writeToFile()

  * Prerequisites for Development:
    * MacBook Air (Intel Core i7, 2.2 GHz, 1 Processor, 2 Cores, 8GB)
    * 64 bit operating system 
    * git version 2.18.0
    * Visual Studio Code Version 1.29.1
    * [GitHub](https://github.com/jkawahara/liri-node-app)
    * Chrome Version 70.0.3538.110 (Official Build) (64-bit)

  * Built With:
    * [Node.js](https://nodejs.org/docs/latest/api/documentation.html)
    * [npm](https://www.npmjs.com/)
      * [axios](https://www.npmjs.com/package/axios)
      * [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
      * [dotenv](https://www.npmjs.com/package/dotenv)
      * [moment](https://www.npmjs.com/package/moment)
    * [OMBDb API](http://www.omdbapi.com/)
    * [Bandsintown API](https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0)
    * [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
    * [File System](https://nodejs.org/docs/latest/api/fs.html)

  * Installing:
    * LIRI Bot is a command line node app
      * For using application, refer to Deployment section below
    * For further development, clone or download application files from [GitHub liri-node-app](https://github.com/jkawahara/liri-node-app), which is organized into the following directory structure:
      * /liri-node-app
        * /node_modules (ignored by git)
        * .env (ignored by git) - stores API keys
        * .gitignore
        * keys.js
        * LICENSE
        * liri.js
        * log.txt - generated after initiating the first search
        * package-lock.json - generated each time npm install executes
        * package.json - includes dependencies: axios, dotenv, moment, node-spotify-api
        * random.txt
        * README.md

  * Running the tests:
    * Unit testing & integration testing was informally executed

  * Deployment:
    * Due to API key privacy, developers and users are required to obtain their own API keys in order to further develop or use the application
    * Each search functionality requires respective API keys (bandsintown, spotify, omdb) as defined as process.env in keys.js
    * User or developer must create .env file with API keys that align with keys.js exports. The following variables must be assigned in .env after requesting and receiving the API keys:
      * BANDS_APP_ID=
      * SPOTIFY_ID=
      * SPOTIFY_SECRET=
      * OMDB_APP_KEY=

## Versioning
  * For the versions available, see the tags on this repository.

## Authors
  * John Kawahara.
  * N/A- See also the list of contributors who participated in this project.

## License
  * This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
  * Thanks to BCBC program personnel, especially our instructor, David Hallinan, along with our TAs Hannah Bowers and Glo Austin, for their guidance and support.
