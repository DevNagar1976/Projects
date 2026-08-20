import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-card">
        <div className="hero-content">
          <div className="eyebrow">✦ PREMIERE WEEK</div>
          <h1>Big screens.<br />Bigger stories.</h1>
          <p>Book tickets for the latest movies, live events and unforgettable experiences near you.</p>
          <a className="hero-cta" href="#movies">Explore now →</a>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="ticket ticket-one">MOVIES</div>
          <div className="ticket ticket-two">LIVE</div>
          <div className="ticket ticket-three">EVENTS</div>
        </div>
      </div>
    </section>
  );
}
