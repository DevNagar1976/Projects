import { useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

const categoryOptions = [
  'Cars', 'Motorcycles', 'Mobile Phones', 'For Sale: Houses & Apartments',
  'Scooters', 'Electronics', 'Furniture', 'Fashion', 'Other'
];

export default function AddProductModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    title: '', price: '', location: 'Ahmedabad, Gujarat', category: 'Cars', imageUrl: '', description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price) return;

    try {
      setSaving(true);
      setError('');
      await onAdd({
        ...form,
        price: Number(form.price),
        imageUrl: form.imageUrl.trim() || '/images/other.svg',
        featured: false
      }, imageFile);
      onClose();
    } catch (err) {
      setError(err.message || 'Could not post the ad');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span className="eyebrow">SELL ON OLX</span>
            <h2>Post your ad</h2>
          </div>
          <button onClick={onClose} className="close-btn"><X /></button>
        </div>

        <form onSubmit={submit} className="product-form">
          <label>Ad title
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. iPhone 15 Pro" required />
          </label>
          <div className="form-row">
            <label>Price (₹)
              <input name="price" type="number" min="1" value={form.price} onChange={handleChange} placeholder="25000" required />
            </label>
            <label>Category
              <select name="category" value={form.category} onChange={handleChange}>
                {categoryOptions.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <label>Location
            <input name="location" value={form.location} onChange={handleChange} placeholder="City, State" />
          </label>
          <label>Image URL (optional)
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." disabled={Boolean(imageFile)} />
          </label>
          <label className="upload-field">
            <span>Or upload image (JPG, PNG, WEBP - max 2MB)</span>
            <div className="upload-control">
              <ImagePlus size={20} />
              <span>{imageFile ? imageFile.name : 'Choose image'}</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>
          </label>
          <label>Description
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your item..." rows="4" />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="primary-btn" disabled={saving}>
            {saving ? 'Posting...' : 'Post now'}
          </button>
        </form>
      </div>
    </div>
  );
}
