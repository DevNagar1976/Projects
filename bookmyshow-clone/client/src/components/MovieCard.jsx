import React from 'react';

export default function MovieCard({ movie, onSelect }) {
  return (
    <article className="movie-card" onClick={() => onSelect(movie)}>
      <div className="poster-wrap">
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <div className="rating-bar">★ {movie.rating}/10 <span>{movie.votes} Votes</span></div>
      </div>
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
    </article>
  );
}
