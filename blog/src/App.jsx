/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

const partners = ["NORTHSTAR", "CAPSTONE", "LUMEN", "BOLT", "MONO", "PULSE"];

const services = [
  {
    icon: "⌕",
    title: "Search Engine Optimization",
    copy: "Build lasting visibility with technical SEO, high-intent content, and a search strategy designed to compound.",
  },
  {
    icon: "◫",
    title: "Conversion Rate Optimization",
    copy: "Turn more visitors into customers through focused experiments, sharper journeys, and conversion-first design.",
  },
  {
    icon: "✦",
    title: "Online Reputation Management",
    copy: "Earn trust and protect your brand with responsive monitoring across every important digital touchpoint.",
  },
  {
    icon: "⌘",
    title: "Social Media Marketing",
    copy: "Create the kind of useful, memorable content that grows community and keeps your brand top of mind.",
  },
  {
    icon: "◎",
    title: "Pay-Per-Click Advertising",
    copy: "Reach the right audience quickly with performance campaigns engineered around revenue, not vanity metrics.",
  },
  {
    icon: "✉",
    title: "Email Marketing Automation",
    copy: "Deliver the right message at the right moment with automated journeys that nurture, retain, and reactivate.",
  },
];

const process = [
  { number: "01", title: "Discover", copy: "We audit your funnel, market, and customer signals to find the clearest growth opportunities." },
  { number: "02", title: "Design", copy: "We turn the strategy into campaigns, content, and experiences your audience wants to act on." },
  { number: "03", title: "Scale", copy: "We test what matters, share the signal clearly, and keep investing where momentum is strongest." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <main>
      <section className="hero-shell" id="home">
        <header className="site-header">
          <a className="brand" href="#home" aria-label="Growly home">
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>Growly</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>

          <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
            <a className="active" href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Services <span aria-hidden="true">⌄</span>
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#insights" onClick={() => setMenuOpen(false)}>
              Insights
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </nav>

          <a className="header-cta" href="#contact">
            Get started <span aria-hidden="true">↗</span>
          </a>
        </header>

        <div className="hero-content">
          <div className="eyebrow">
            <span aria-hidden="true">✦</span> Best marketing agency of 2026 <span aria-hidden="true">✦</span>
          </div>
          <h1>Grow Your Business With Smarter Digital Marketing</h1>
          <p>
            One integrated growth team, built to sharpen your strategy, win more customers, and turn every campaign into measurable momentum.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contact">
              Get started <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-light" href="#contact">
              Book a demo <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="partner-strip" aria-label="Trusted by growing brands">
          {partners.map((partner, index) => (
            <div className="partner" key={partner}>
              <span className={`partner-glyph glyph-${index + 1}`} aria-hidden="true" />
              {partner}
            </div>
          ))}
        </div>

        <div className="feature-cards" id="insights">
          <article className="feature-card card-growth">
            <div className="card-panel growth-panel">
              <div>
                <strong>+93%</strong>
                <span>Increase rate</span>
              </div>
              <span className="trend-icon" aria-hidden="true">↗</span>
              <div className="bar-chart" aria-label="Increasing campaign performance chart">
                {[22, 43, 31, 58, 50, 76, 64, 83, 95, 69, 88, 98].map((height, index) => (
                  <i key={index} style={{ height: `${height}%` }} className={index % 2 === 0 ? "dark-bar" : "light-bar"} />
                ))}
              </div>
            </div>
            <a href="#services">See our results <span aria-hidden="true">↗</span></a>
          </article>

          <article className="feature-card card-engagement">
            <div className="card-panel engagement-panel">
              <h2>Engagement</h2>
              <div className="metric-row">
                <div><span>Users</span><strong>287</strong></div>
                <div><span>Orders</span><strong>595</strong></div>
                <div><span>Conversions</span><strong>10%</strong></div>
              </div>
              <div className="avatars" aria-label="Campaign team">
                {["AP", "NK", "JR", "TM", "SK", "+8"].map((label, index) => (
                  <span key={label} className={`avatar avatar-${index + 1}`}>{label}</span>
                ))}
              </div>
            </div>
            <a href="#services">Explore plans <span aria-hidden="true">↗</span></a>
          </article>

          <article className="feature-card card-team">
            <div className="card-panel team-panel">
              <div className="team-copy">
                <h2>Team Collaboration</h2>
                <p>Clear ideas, quicker decisions, and one team moving toward measurable results.</p>
              </div>
              <img
                className="team-portrait"
                src="/assets/team-collaboration.webp"
                alt="Growly marketing strategist"
              />
            </div>
            <a href="#contact">Send us a message <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="section-heading">
          <span className="section-kicker">Everything your brand needs to grow</span>
          <h2>Powerful Digital Strategies Built for Measurable Growth</h2>
          <p>Six connected capabilities, managed by one senior team and measured against the outcomes that matter to your business.</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-item" key={service.title}>
              <span className="service-icon" aria-hidden="true">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <a href="#contact">Find out more <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="dark-showcase section-pad" id="about">
        <div className="showcase-grid">
          <div className="showcase-visual">
            <img src="/assets/growth-showcase.webp" alt="Founder celebrating business growth" />
            <div className="floating-chip order-chip"><span>▣</span> +1 new order</div>
            <div className="floating-chip revenue-chip"><span>$</span> $70.00</div>
            <div className="visual-caption">
              <span>Revenue influenced</span>
              <strong>$8.4M</strong>
            </div>
          </div>

          <div className="showcase-copy">
            <span className="success-pill"><i aria-hidden="true">↯</i> 99% Success Rate</span>
            <h2>Built to help ambitious teams attract, convert, and retain more customers.</h2>
            <p>
              No scattered freelancers. No vague monthly reports. Growly brings strategy, creative, media, and analytics into one focused growth system.
            </p>
            <div className="proof-list">
              <div><span aria-hidden="true">✓</span><p><strong>Senior expertise</strong> at every stage of your funnel.</p></div>
              <div><span aria-hidden="true">✓</span><p><strong>Clear reporting</strong> connected to commercial outcomes.</p></div>
              <div><span aria-hidden="true">✓</span><p><strong>Fast experimentation</strong> without compromising your brand.</p></div>
            </div>
            <a className="button button-coral" href="#contact">Start growing <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="process-topline">
          <div>
            <span className="section-kicker">A simpler way to scale</span>
            <h2>From first signal to sustainable growth.</h2>
          </div>
          <p>Strategy stays useful when everyone can see the next move. Our three-step rhythm keeps your team aligned and your campaigns learning.</p>
        </div>

        <div className="process-grid">
          {process.map((step) => (
            <article className="process-card" key={step.number}>
              <span className="process-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-section section-pad">
        <div className="testimonial-card">
          <div className="quote-mark" aria-hidden="true">“</div>
          <blockquote>
            Growly gave us a growth system the whole team could understand. Within one quarter, qualified leads increased and our acquisition costs finally moved in the right direction.
          </blockquote>
          <div className="quote-person">
            <span className="quote-avatar">AM</span>
            <div><strong>Anaya Mehta</strong><span>Co-founder, Lumen Labs</span></div>
          </div>
          <div className="quote-metric"><strong>2.7×</strong><span>more qualified leads</span></div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-grid">
          <div className="contact-copy">
            <span className="section-kicker">Ready when you are</span>
            <h2>Let’s turn your next growth target into a clear plan.</h2>
            <p>Tell us where you want to go. We’ll reply with a practical first step—no generic pitch deck.</p>
            <div className="contact-details">
              <a href="mailto:hello@growly.agency">hello@growly.agency</a>
              <span>Ahmedabad · Working worldwide</span>
            </div>
          </div>

          {submitted ? (
            <div className="success-card" role="status">
              <span aria-hidden="true">✓</span>
              <h3>Thanks — your brief is ready.</h3>
              <p>We’ll review your goals and get back to you within one business day.</p>
              <button type="button" onClick={() => setSubmitted(false)}>Send another message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <label>
                Your name
                <input name="name" type="text" placeholder="e.g. Hanjari Prajapati" required />
              </label>
              <label>
                Work email
                <input name="email" type="email" placeholder="you@company.com" required />
              </label>
              <label>
                What would you like to grow?
                <textarea name="message" rows={4} placeholder="Tell us about your goal, timeline, or current challenge…" required />
              </label>
              <button className="button button-dark" type="submit">Send my brief <span aria-hidden="true">↗</span></button>
            </form>
          )}
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home" aria-label="Growly home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>Growly</span>
        </a>
        <p>Smarter digital marketing for ambitious teams.</p>
        <nav aria-label="Footer navigation">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <span>© 2026 Growly. Built for measurable growth.</span>
      </footer>
    </main>
  );
}
