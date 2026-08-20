import React from 'react';

export default function MovieModal({ movie, onClose, onBook }) {
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="movie-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <img src={movie.poster} alt={`${movie.title} poster`} className="modal-poster" />
        <div className="modal-copy">
          <span className="chip">{movie.certificate}</span>
          <h2>{movie.title}</h2>
          <div className="modal-rating">★ <strong>{movie.rating}/10</strong> <span>{movie.votes} votes</span></div>
          <div className="movie-meta">
            <span>◷ {movie.duration}</span>
            <span>◉ {movie.language}</span>
            <span>▣ Now Showing</span>
          </div>
          <p>{movie.description}</p>
          <p className="genre-line">{movie.genre}</p>
          <button className="primary-btn" onClick={() => onBook(movie)}>Book tickets</button>
        </div>
      </section>
    </div>
  );
}
