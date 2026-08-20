import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import MovieCard from './components/MovieCard.jsx';
import MovieModal from './components/MovieModal.jsx';
import BookingModal from './components/BookingModal.jsx';
import { events, movies as fallbackMovies } from './data/movies.js';
import { movieApi } from './services/api.js';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(fallbackMovies.slice(0, 5));
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [apiWarning, setApiWarning] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bookingMovie, setBookingMovie] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        setLoadingMovies(true);
        const result = query.trim()
          ? await movieApi.searchMovies(query.trim())
          : await movieApi.getMovies();

        if (!cancelled) {
          setMovies(result.movies || []);
          setApiWarning('');
        }
      } catch (error) {
        if (!cancelled) {
          const term = query.trim().toLowerCase();
          const fallback = fallbackMovies.slice(0, 5).filter((movie) =>
            !term || movie.title.toLowerCase().includes(term)
          );
          setMovies(fallback);
          setApiWarning('Backend is offline, so local demo movie data is being shown.');
        }
      } finally {
        if (!cancelled) setLoadingMovies(false);
      }
    }, query.trim() ? 250 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const openBooking = (movie) => {
    setSelectedMovie(null);
    setBookingMovie(movie);
  };

  return (
    <div className="app-shell">
      <Header query={query} setQuery={setQuery} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      <Hero />

      <main>
        <section className="container content-section" id="movies">
          <div className="section-heading">
            <div><span className="section-kicker">NOW SHOWING</span><h2>Recommended Movies</h2></div>
            <button className="text-btn">See All →</button>
          </div>

          {apiWarning && <div className="api-warning">{apiWarning}</div>}

          {loadingMovies ? (
            <div className="loading-state">Loading movies...</div>
          ) : movies.length ? (
            <div className="movie-grid">
              {movies.map((movie) => <MovieCard key={movie.id} movie={movie} onSelect={setSelectedMovie} />)}
            </div>
          ) : (
            <div className="empty-state"><div className="empty-icon">⌕</div><h3>No movies found</h3><p>Try a different movie title.</p></div>
          )}
        </section>

        <section className="container promo-strip" id="offers">
          <div className="promo-icon">🎟</div>
          <div><span>EXCLUSIVE OFFER</span><h3>Weekend Movie Pass</h3><p>Save more when you book two or more tickets.</p></div>
          <button>View offers</button>
        </section>

        <section className="dark-section" id="events">
          <div className="container content-section">
            <div className="section-heading light">
              <div><span className="section-kicker">LIVE & EXPERIENCES</span><h2>The Best of Entertainment</h2></div>
            </div>
            <div className="event-grid">
              {events.map((event) => (
                <article className="event-card" key={event.id}>
                  <img src={event.image} alt={event.title} />
                  <span>{event.label}</span>
                  <h3>{event.title}</h3>
                  <p>Ahmedabad • This weekend</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <strong>book<span>my</span>show clone</strong>
          <p>Full-stack demo built with React, Node.js, Express and MongoDB. No real payments are processed.</p>
        </div>
      </footer>

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} onBook={openBooking} />
      <BookingModal movie={bookingMovie} onClose={() => setBookingMovie(null)} />
    </div>
  );
}
