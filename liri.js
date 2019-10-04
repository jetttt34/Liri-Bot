require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var concertThis = function (band) {
    var url = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
    axios.get(url).then(function (response) {
        for (var i = 0; i < response.data.length && i < 3; i++) {
            console.log(
                "Venue: " + response.data[i].venue.name + "\n",
                "City: " + response.data[i].venue.city + "\n",
                "Time: " + moment(response.data[i].datetime).format('MM/DD/YYYY') + "\n",
            );
        }
    });
}

// spotify this song
var spotifyThis = function (song) {
    if (song === null || song.trim().length === 0) {
        song = "all me drake";
    }
    spotify.search({ type: "track", query: song },
        function (err, data) {
            if (err) {
                return console.log("Error occurred" + err);
            };
            // debugger;
            console.log(
                " Song: " + data.tracks.items[0].name + "\n",
                "Artist: " + data.tracks.items[0].artists[0].name + "\n",
                "Preview: " + data.tracks.items[0].preview_url + "\n",
                "Album: " + data.tracks.items[0].album.name + "\n",
            );
        });
}

//do-what-it-says
var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } console.log(data);
        doWhatItSays();
    })
} 


//user input & what is output
var whichCommand = function(action,value){

    if(action==="concert-this"){
        concertThis(value)
    }else if(action==="spotify-this-song"){
        spotifyThis(value);
    }else if(action === "movie-this"){
        movieThis(value);
    } 
    else {
        console.log("Unrecognized action. Format needed: node liri.js concert-this, spotify-this-song, movie-this ");
    }
} 

var userCommand = process.argv[2];
var userValue = process.argv.splice(3).join("+");

whichCommand(userCommand,userValue);
