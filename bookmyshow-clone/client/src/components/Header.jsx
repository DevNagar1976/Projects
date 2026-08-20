import React from 'react';

export default function Header({ query, setQuery, mobileMenu, setMobileMenu }) {
  return (
    <>
      <header className="topbar">
        <div className="container nav-main">
          <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            book<span>my</span>show
          </button>

          <div className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Movies, Events, Plays, Sports and Activities"
            />
          </div>

          <div className="nav-actions">
            <button className="location-btn">⌖ Ahmedabad</button>
            <button className="signin-btn">Sign in</button>
            <button className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">
              {mobileMenu ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      <div className={`subnav ${mobileMenu ? 'mobile-open' : ''}`}>
        <div className="container subnav-inner">
          <nav>
            <a href="#movies">Movies</a>
            <a href="#events">Stream</a>
            <a href="#events">Events</a>
            <a href="#events">Plays</a>
            <a href="#events">Sports</a>
            <a href="#events">Activities</a>
          </nav>
          <nav className="secondary-links">
            <a href="#offers">ListYourShow</a>
            <a href="#offers">Corporates</a>
            <a href="#offers">Offers</a>
            <a href="#offers">Gift Cards</a>
          </nav>
        </div>
      </div>
    </>
  );
}
