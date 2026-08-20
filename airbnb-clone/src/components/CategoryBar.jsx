import { useRef } from 'react';
import Icon from './Icon.jsx';

const categoryIcons = {
  'Amazing views': 'mountain',
  Beachfront: 'umbrella',
  Cabins: 'tent',
  Countryside: 'tree',
  Design: 'building',
  Farms: 'sprout',
  'Historical homes': 'landmark',
  Islands: 'palm',
  Lakefront: 'waves',
  Luxe: 'gem',
  Mansions: 'castle',
  'National parks': 'tree',
  Pools: 'waves',
  'Tiny homes': 'home',
  Trending: 'flame',
};

export default function CategoryBar({ categories, activeCategory, onChange, onOpenFilters }) {
  const scrollRef = useRef(null);

  const move = (direction) => {
    scrollRef.current?.scrollBy({ left: direction * 420, behavior: 'smooth' });
  };

  return (
    <section className="category-section">
      <div className="category-shell shell">
        <button className="category-arrow left" type="button" onClick={() => move(-1)} aria-label="Previous categories">
          <Icon name="chevronLeft" size={18} />
        </button>

        <div className="categories" ref={scrollRef}>
          {categories.map((category) => (
            <button
              type="button"
              className={activeCategory === category ? 'category active' : 'category'}
              key={category}
              onClick={() => onChange(category)}
            >
              <Icon name={categoryIcons[category] || 'home'} size={23} strokeWidth={1.7} />
              <span>{category}</span>
            </button>
          ))}
        </div>

        <button className="category-arrow right" type="button" onClick={() => move(1)} aria-label="Next categories">
          <Icon name="chevronRight" size={18} />
        </button>

        <button className="filter-button" type="button" onClick={onOpenFilters}>
          <Icon name="filter" size={17} />
          Filters
        </button>
      </div>
    </section>
  );
}
