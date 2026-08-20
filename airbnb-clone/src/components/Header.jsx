import Icon from './Icon.jsx';
import Logo from './Logo.jsx';

export default function Header({ activeTab, onTabChange, onOpenLogin }) {
  return (
    <header className="site-header" id="top">
      <div className="header-row shell">
        <Logo />

        <nav className="main-tabs" aria-label="Main navigation">
          {['Homes', 'Experiences', 'Services'].map((tab) => (
            <button
              className={activeTab === tab ? 'main-tab active' : 'main-tab'}
              key={tab}
              onClick={() => onTabChange(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="host-button" type="button">
            Airbnb your home
          </button>
          <button className="round-button" type="button" aria-label="Choose language">
            <Icon name="globe" size={19} />
          </button>
          <button className="profile-button" type="button" onClick={onOpenLogin}>
            <Icon name="menu" size={18} />
            <span className="profile-avatar"><Icon name="user" size={17} /></span>
          </button>
        </div>
      </div>
    </header>
  );
}
