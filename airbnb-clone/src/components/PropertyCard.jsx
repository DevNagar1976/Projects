import Icon from './Icon.jsx';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export default function PropertyCard({ property, favourite, onToggleFavourite }) {
  return (
    <article className="property-card">
      <div className="property-image-wrap">
        <img className="property-image" src={property.image} alt={property.title} loading="lazy" />
        {property.guestFavourite && <span className="favourite-badge">Guest favourite</span>}
        <button
          className={favourite ? 'heart-button selected' : 'heart-button'}
          type="button"
          onClick={() => onToggleFavourite(property.id)}
          aria-label={favourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Icon name="heart" size={24} fill={favourite ? 'currentColor' : 'rgba(0,0,0,.35)'} />
        </button>
        <div className="image-dots" aria-hidden="true">
          <span className="active" />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="property-info">
        <div className="property-title-row">
          <h3>{property.location}</h3>
          <span className="rating"><Icon name="star" size={14} fill="currentColor" /> {property.rating}</span>
        </div>
        <p>{property.title}</p>
        <p>{property.distance}</p>
        <p>{property.dates}</p>
        <p className="price"><strong>{formatCurrency(property.price)}</strong> night</p>
      </div>
    </article>
  );
}
