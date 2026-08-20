import Icon from './Icon.jsx';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const submitSearch = () => {
    onSearch({ destination, checkIn, checkOut, guests });
  };

  return (
    <section className="search-wrap shell" aria-label="Search accommodation">
      <div className="search-bar">
        <label className="search-field destination-field">
          <span>Where</span>
          <div className="input-with-icon">
            <Icon name="mapPin" size={16} />
            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Search destinations"
            />
          </div>
        </label>

        <label className="search-field">
          <span>Check in</span>
          <input
            type="date"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
          />
        </label>

        <label className="search-field">
          <span>Check out</span>
          <input
            type="date"
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
          />
        </label>

        <label className="search-field guest-field">
          <span>Who</span>
          <select value={guests} onChange={(event) => setGuests(Number(event.target.value))}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
              <option value={count} key={count}>
                {count} guest{count > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </label>

        <button className="search-button" type="button" onClick={submitSearch}>
          <Icon name="search" size={20} />
          <span>Search</span>
        </button>
      </div>
    </section>
  );
}
