import { useMemo, useState } from 'react';
import Icon from './components/Icon.jsx';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import CategoryBar from './components/CategoryBar.jsx';
import PropertyCard from './components/PropertyCard.jsx';
import Footer from './components/Footer.jsx';
import MobileNav from './components/MobileNav.jsx';
import { FilterModal, LoginModal } from './components/Modal.jsx';
import { categories, properties } from './data/properties.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('Homes');
  const [activeCategory, setActiveCategory] = useState('Trending');
  const [destination, setDestination] = useState('');
  const [favourites, setFavourites] = useState(new Set([2, 4]));
  const [loginOpen, setLoginOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceLimit, setPriceLimit] = useState(13000);
  const [guestFavouriteOnly, setGuestFavouriteOnly] = useState(false);
  const [toast, setToast] = useState('');

  const filteredProperties = useMemo(() => {
    const query = destination.toLowerCase().trim();
    return properties.filter((property) => {
      const matchesDestination = !query || `${property.location} ${property.title}`.toLowerCase().includes(query);
      const matchesCategory = activeCategory === 'Trending' || property.category === activeCategory;
      const matchesPrice = property.price <= priceLimit;
      const matchesFavourite = !guestFavouriteOnly || property.guestFavourite;
      return matchesDestination && matchesCategory && matchesPrice && matchesFavourite;
    });
  }, [activeCategory, destination, priceLimit, guestFavouriteOnly]);

  const toggleFavourite = (id) => {
    setFavourites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSearch = ({ destination: nextDestination, guests }) => {
    setDestination(nextDestination);
    setToast(nextDestination ? `Showing stays for ${nextDestination} · ${guests} guest${guests > 1 ? 's' : ''}` : `Showing stays for ${guests} guest${guests > 1 ? 's' : ''}`);
    window.setTimeout(() => setToast(''), 2800);
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} onOpenLogin={() => setLoginOpen(true)} />
      <SearchBar onSearch={handleSearch} />
      <CategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
        onOpenFilters={() => setFiltersOpen(true)}
      />

      <main className="main-content shell" id="listings">
        <div className="listing-heading">
          <div>
            <p className="eyebrow">Explore India</p>
            <h1>{activeTab === 'Homes' ? 'Stays you’ll love' : `${activeTab} coming soon`}</h1>
          </div>
          <button className="compact-filter" type="button" onClick={() => setFiltersOpen(true)}>
            <Icon name="sliders" size={17} /> Filters
          </button>
        </div>

        {activeTab === 'Homes' ? (
          filteredProperties.length > 0 ? (
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  favourite={favourites.has(property.id)}
                  onToggleFavourite={toggleFavourite}
                />
              ))}
            </div>
          ) : (
            <section className="empty-state">
              <h2>No stays match these filters</h2>
              <p>Try another category, destination, or price range.</p>
              <button type="button" onClick={() => { setDestination(''); setActiveCategory('Trending'); setPriceLimit(13000); setGuestFavouriteOnly(false); }}>Clear filters</button>
            </section>
          )
        ) : (
          <section className="empty-state">
            <h2>Discover curated {activeTab.toLowerCase()}</h2>
            <p>This demo focuses on the responsive homes browsing experience.</p>
            <button type="button" onClick={() => setActiveTab('Homes')}>Browse homes</button>
          </section>
        )}
      </main>

      <Footer />
      <MobileNav onOpenLogin={() => setLoginOpen(true)} />

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      {filtersOpen && (
        <FilterModal
          priceLimit={priceLimit}
          onPriceChange={setPriceLimit}
          instantBook={guestFavouriteOnly}
          onInstantBookChange={setGuestFavouriteOnly}
          onClose={() => setFiltersOpen(false)}
          onApply={() => setFiltersOpen(false)}
        />
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
