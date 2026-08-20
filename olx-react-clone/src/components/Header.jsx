import { ChevronDown, Heart, MapPin, Menu, Search, UserRound } from 'lucide-react';

export default function Header({ onSell, search, setSearch }) {
  return (
    <>
      <header className="topbar">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="OLX home">
            <span className="brand-o">O</span><span>L</span><span>X</span>
          </a>

          <div className="location-box">
            <MapPin size={19} />
            <span>India</span>
            <ChevronDown size={18} />
          </div>

          <div className="search-box">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find Cars, Mobile Phones and more..."
              aria-label="Search products"
            />
            <button aria-label="Search"><Search size={22} /></button>
          </div>

          <button className="language-btn">ENGLISH <ChevronDown size={16} /></button>
          <button className="icon-btn" aria-label="Favorites"><Heart size={23} /></button>
          <button className="login-btn"><UserRound size={19} /> Login</button>
          <button className="sell-btn" onClick={onSell}><span>＋</span> SELL</button>
          <button className="mobile-menu" aria-label="Menu"><Menu /></button>
        </div>
      </header>

      <div className="quick-strip">
        <div className="quick-inner">
          <strong>ALL CATEGORIES <ChevronDown size={16} /></strong>
          <span>Cars</span>
          <span>Motorcycles</span>
          <span>Mobile Phones</span>
          <span>For Sale: Houses & Apartments</span>
          <span>Scooters</span>
          <span>Commercial Vehicles</span>
        </div>
      </div>
    </>
  );
}
