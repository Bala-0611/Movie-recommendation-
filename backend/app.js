const express = require('express');
const cors = require('cors');
const movies = require('./movies.json'); // Load your movie data

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing application/json

// API to fetch all movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// API to recommend movies by genre
app.get('/api/recommend', (req, res) => {
  const { genre } = req.query; // Get genre from query parameters

  if (!genre) {
    return res.status(400).json({ message: 'Genre query parameter is required.' });
  }

  const filteredMovies = movies.filter(movie =>
    movie.genre.toLowerCase() === genre.toLowerCase()
  );

  if (filteredMovies.length === 0) {
    return res.status(404).json({ message: `No movies found for genre: ${genre}` });
  }

  res.json(filteredMovies);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});