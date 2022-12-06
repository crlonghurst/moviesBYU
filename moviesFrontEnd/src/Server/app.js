var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');

const PORT =  5173;


var app = express();

// view engine setup
app.set('view engine', 'ejs')
  .set('views', __dirname)
  .use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow_Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept, content-type, application/json");
    next();
  })
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
app.get('/', function(req, res){
  })
  //Back-End requirements
app.get('/movies/:search', (req,res) => {
    //this is the data object that will be written to a file for access later
    var movieData = {
      "movie_id":"integer",
      "title":"string",
      "poster_image_url":"string",
      "popularity_summary":"string"
    }
    //This is the API call that will be called 
    var options = {
      url:'https://api.themoviedb.org/3/search/movie?api_key=1e3af67e7ee8f795051fbca690c04f12&query='+req.body.search+'&language=en-US&page=1&include_adult=false',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: movieData
    }
    //This calls the API get's the response and then parses it. Then splices so that there is only the first 10.
    //The spliced list is then sent back to see on the front end.
    request.get(options, function(error, response, body){
        var parsed = JSON.parse(body)
        var movieList = parsed.results.map(movie => ({
            movie_id: movie.id,
            title: movie.title,
            poster_image_url: movie.poster_path,
            popularity_summary: `${movie.popularity} out of ${movie.vote_count}`
          })).slice(0, 10)
        
        res.send(movieList)
      }
    )
  })
.listen(PORT, () => console.log(`Listening on ${ PORT }`));

module.exports = app;
