import express from 'express';
import { movies } from '../data/movies.js';

const router = express.Router();

// Task 1: Return a hardcoded list of 5 upcoming movies as JSON.
router.get('/movies', (req, res) => {
  res.status(200).json({ success: true, count: movies.length, movies });
});

// Task 3: Search movie titles using q, Array.filter() and String.toLowerCase().
router.get('/search-movies', (req, res) => {
  const q = String(req.query.q || '').trim().toLowerCase();

  if (!q) {
    return res.status(200).json({ success: true, count: movies.length, movies });
  }

  const results = movies.filter((movie) => movie.title.toLowerCase().includes(q));

  return res.status(200).json({ success: true, count: results.length, movies: results });
});

export default router;
