import { MapPin, ShieldCheck, X } from 'lucide-react';

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0
}).format(price);

export default function ProductModal({ product, onClose }) {
  if (!product) return null;
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="detail-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="detail-close"><X /></button>
        <div className="detail-image-area">
          <img src={product.imageUrl} alt={product.title} />
        </div>
        <div className="detail-content">
          <span className="eyebrow">{product.category}</span>
          <h2>{product.title}</h2>
          <div className="detail-price">{formatPrice(product.price)}</div>
          <p className="detail-location"><MapPin size={17} /> {product.location}</p>
          <p>{product.description || 'No description added for this item.'}</p>
          <div className="seller-box">
            <div className="seller-avatar">HP</div>
            <div><strong>Verified Seller</strong><span>Member since 2026</span></div>
            <ShieldCheck size={23} />
          </div>
          <button className="chat-btn">Chat with seller</button>
        </div>
      </div>
    </div>
  );
}
