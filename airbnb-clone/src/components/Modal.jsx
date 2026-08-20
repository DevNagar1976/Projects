import Icon from './Icon.jsx';

export function LoginModal({ onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <div className="modal-card login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close" type="button" onClick={onClose}><Icon name="x" size={20} /></button>
          <strong>Log in or sign up</strong>
          <span />
        </div>
        <div className="modal-body">
          <h2 id="login-title">Welcome to Airbnb</h2>
          <label className="stacked-input">
            <span>Country/region</span>
            <select defaultValue="India (+91)">
              <option>India (+91)</option>
              <option>United States (+1)</option>
              <option>United Kingdom (+44)</option>
            </select>
          </label>
          <label className="stacked-input phone-input">
            <span>Phone number</span>
            <input type="tel" placeholder="Phone number" />
          </label>
          <p className="fine-print">We’ll call or text you to confirm your number. Standard message and data rates apply.</p>
          <button className="continue-button" type="button">Continue</button>
          <div className="or-divider"><span>or</span></div>
          <button className="social-login" type="button">Continue with Google</button>
          <button className="social-login" type="button">Continue with email</button>
        </div>
      </div>
    </div>
  );
}

export function FilterModal({ priceLimit, onPriceChange, instantBook, onInstantBookChange, onClose, onApply }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <div className="modal-card filter-modal" role="dialog" aria-modal="true" aria-labelledby="filter-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close" type="button" onClick={onClose}><Icon name="x" size={20} /></button>
          <strong id="filter-title">Filters</strong>
          <span />
        </div>
        <div className="modal-body">
          <section className="filter-block">
            <h2>Price range</h2>
            <p>Nightly prices before fees and taxes</p>
            <input
              className="price-range"
              type="range"
              min="4000"
              max="13000"
              step="250"
              value={priceLimit}
              onChange={(event) => onPriceChange(Number(event.target.value))}
            />
            <div className="price-range-values"><span>₹4,000</span><strong>Up to ₹{priceLimit.toLocaleString('en-IN')}</strong></div>
          </section>
          <section className="filter-block switch-row">
            <div>
              <h2>Guest favourites</h2>
              <p>The most loved homes on Airbnb</p>
            </div>
            <button className={instantBook ? 'toggle active' : 'toggle'} type="button" onClick={() => onInstantBookChange(!instantBook)}>
              <span>{instantBook ? <Icon name="minus" size={15} /> : <Icon name="plus" size={15} />}</span>
            </button>
          </section>
        </div>
        <div className="filter-actions">
          <button type="button" className="clear-button" onClick={() => { onPriceChange(13000); onInstantBookChange(false); }}>Clear all</button>
          <button type="button" className="show-stays-button" onClick={onApply}>Show stays</button>
        </div>
      </div>
    </div>
  );
}
