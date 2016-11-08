const db = require('../lib/dbConnect');

// Your middleware MUST allow limit and offset to be sent
// via query parameters to the db for filtering

// default limit
const limit = 10;
// default offset
const offset = 0;

function getAllMovies(req, res, next) {
    db.any(`SELECT * FROM movies;`)
    .then((movies) => {
      res.rows = movies;
      next();
    })
    .catch(error => next(error));
}

function getMovie(req, res, next) {
  req.body.mId = Number.parseInt(req.params.movieId);
  db.one(`SELECT * FROM movies
          WHERE id = $1;`, [req.body.mId])
    .then((movie) => {
      res.rows = movie;
      next();
    })
    .catch(error => next(error));
}

function updateMovie(req, res, next) {
  req.body.title = req.query.title;
  req.body.id = Number.parseInt(req.query.id);
  db.none(`UPDATE movies
          SET title = $1
          WHERE id = $2;`, [req.body.title, req.body.id])
    .then((data) => {
      res.rows = data;
      next();
    })
    .catch((error) => next(error));
}

function deleteMovie(req, res, next) {
  const movieToDelete = res.rows.id;
  db.none(`DELETE FROM movies
          WHERE id = ${movieToDelete};`)
    .then((data) => {
      res.rows = data;
      next();
    })
    .catch(error => next(error));
}

// BONUS
function getAllMoviesWithRatings(req, res, next) {
  db.any(`SELECT movies.title, ratings.rating
          FROM movies
          INNER JOIN ratings
            ON (movies.id = ratings.movie_id);
          `)
  .then((movies) => {
    res.rows = movies
    next();
  })
  .catch(error => next(error));
}

module.exports = {
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  getAllMoviesWithRatings
};
