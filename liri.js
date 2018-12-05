// Read and set environment variables with dotenv package
require("dotenv").config();

// Import keys.js and assign to keysAPI
var keysAPI = require("./keys.js");


var spotify = new Spotify(keys.spotify);