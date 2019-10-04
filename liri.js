require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

// spotify this song



let input = process.argv[3]

function spotifyThis() {
    // if (song === null || song.trim().length === 0) {
    //     song = "all me drake";
    // }
    spotify.search({ type: "track", query:`${input}`},
        function (err, data) {
            if (err) {
                return console.log("Error occurred" + err);
            };
            // debugger;
            console.log(
                " Song: " + data.tracks.items[0].name + "\n",
                "Artist: " + data.tracks.items[0].artists[0].name + "\n",
                // "Preview: " + data.tracks.items[0].preview_url + "\n",
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
