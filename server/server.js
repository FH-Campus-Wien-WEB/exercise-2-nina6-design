const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'files')));

//  GET all movies
app.get('/movies', function (req, res) {
  const moviesArray = Object.values(movieModel);
  res.json(moviesArray);
});

//  GET one movie
app.get('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;
  const movie = movieModel[imdbID];

  if (movie) {
    res.json(movie);
  } else {
    res.sendStatus(404);
  }
});

// PUT (update OR create)
app.put('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;
  const movie = req.body;

  if (movieModel[imdbID]) {
    // 🔹 UPDATE
    movieModel[imdbID] = movie;
    res.sendStatus(200);
  } else {
    // 🔹 CREATE
    movieModel[imdbID] = movie;
    res.status(201).json(movie);
  }
});

app.listen(3000);

console.log("Server now listening on http://localhost:3000/");