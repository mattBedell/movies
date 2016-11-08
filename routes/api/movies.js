const express = require('express');
const router = express.Router();
const { getAllMovies, getMovie, getAllMoviesWithRatings, deleteMovie, updateMovie } = require('../../models/movie');

const sendResponse = (req, res) => res.json(res.rows);
router.route('/update')
  .post(updateMovie, sendResponse);

router.route('/ratings')
  .get(getAllMoviesWithRatings, sendResponse);

router.route('/:movieId')
  .get(getMovie, sendResponse)
  .delete(getMovie, deleteMovie, sendResponse);

router.route('/')
  .get(getAllMovies, sendResponse);

// handle all the routes

// Get movies withrating BONUS

// Get single movie

module.exports = router;
