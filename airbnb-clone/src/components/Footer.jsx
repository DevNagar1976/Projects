import Icon from './Icon.jsx';

const footerGroups = [
  {
    title: 'Support',
    links: ['Help Centre', 'Get help with a safety issue', 'AirCover', 'Anti-discrimination', 'Disability support', 'Cancellation options'],
  },
  {
    title: 'Hosting',
    links: ['Airbnb your home', 'Airbnb your experience', 'Airbnb your service', 'AirCover for Hosts', 'Hosting resources', 'Community forum'],
  },
  {
    title: 'Airbnb',
    links: ['2026 Summer Release', 'Newsroom', 'New features', 'Careers', 'Investors', 'Airbnb.org emergency stays'],
  },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content shell">
        <h2>Inspiration for future getaways</h2>
        <div className="footer-tabs">
          {['Popular', 'Arts & culture', 'Beach', 'Mountains', 'Outdoors', 'Things to do'].map((tab, index) => (
            <button className={index === 0 ? 'active' : ''} key={tab} type="button">{tab}</button>
          ))}
        </div>

        <div className="destination-links">
          {['Goa holiday rentals', 'Manali cabin rentals', 'Udaipur villa rentals', 'Munnar cottages', 'Jaipur house rentals', 'Mumbai apartment rentals', 'Rishikesh stays', 'Lonavala villas', 'Andaman beachfront stays', 'Coorg farm stays', 'Nainital cottages', 'Kashmir homes'].map((destination) => (
            <a key={destination} href="#listings">{destination}</a>
          ))}
        </div>

        <div className="footer-groups">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map((link) => <a href="#top" key={link}>{link}</a>)}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom shell">
        <div className="legal-links">
          <span>© 2026 Airbnb Clone</span>
          <a href="#top">Privacy</a>
          <a href="#top">Terms</a>
          <a href="#top">Sitemap</a>
        </div>
        <div className="locale-links">
          <button type="button"><Icon name="globe" size={16} /> English (IN)</button>
          <button type="button">₹ INR</button>
          <a href="#top" aria-label="Facebook"><Icon name="facebook" size={18} /></a>
          <a href="#top" aria-label="Twitter"><Icon name="twitter" size={18} /></a>
          <a href="#top" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
