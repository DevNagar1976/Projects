import { Heart, MapPin, Trash2 } from 'lucide-react';

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0
}).format(price);

export default function ProductCard({ product, onOpen, onDelete }) {
  return (
    <article className="product-card" onClick={() => onOpen(product)}>
      <div className="product-image-wrap">
        {product.featured && <span className="featured-badge">FEATURED</span>}
        <img src={product.imageUrl} alt={product.title} className="product-image" />
        <button className="heart-btn" onClick={(e) => e.stopPropagation()} aria-label="Save item">
          <Heart size={20} />
        </button>
      </div>
      <div className="product-info">
        <div className="product-price">{formatPrice(product.price)}</div>
        <h3>{product.title}</h3>
        <p className="category-text">{product.category}</p>
        <div className="card-bottom">
          <span><MapPin size={14} /> {product.location}</span>
          <button
            className="delete-btn"
            title="Delete listing"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(product.id);
            }}
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
