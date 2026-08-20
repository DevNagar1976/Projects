import Icon from './Icon.jsx';

export default function MobileNav({ onOpenLogin }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <a className="active" href="#top"><Icon name="search" size={22} /><span>Explore</span></a>
      <a href="#listings"><Icon name="heart" size={22} /><span>Wishlists</span></a>
      <a href="#footer"><Icon name="message" size={22} /><span>Trips</span></a>
      <button type="button" onClick={onOpenLogin}><Icon name="user" size={22} /><span>Log in</span></button>
    </nav>
  );
}
