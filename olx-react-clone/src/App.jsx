import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductCard from './components/ProductCard';
import AddProductModal from './components/AddProductModal';
import ProductModal from './components/ProductModal';
import Footer from './components/Footer';
import { productApi } from './services/api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productApi.getAll();
      setProducts(data);
    } catch (err) {
      setError(`${err.message}. Make sure the backend is running on port 5000.`);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || [product.title, product.category, product.location]
        .some((value) => String(value || '').toLowerCase().includes(q));
      const matchesCategory = category === 'All' || product.category === category ||
        (category === 'Mobiles' && product.category === 'Mobile Phones') ||
        (category === 'Bikes' && ['Motorcycles', 'Scooters'].includes(product.category)) ||
        (category === 'Properties' && product.category.includes('Houses')) ||
        (category === 'Electronics' && ['Electronics', 'Mobile Phones'].includes(product.category));
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const addProduct = async (product, imageFile) => {
    let imageUrl = product.imageUrl;

    if (imageFile) {
      const uploadResult = await productApi.uploadImage(imageFile);
      imageUrl = uploadResult.imageUrl;
    }

    const updatedProducts = await productApi.add({ ...product, imageUrl });
    setProducts(updatedProducts);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this listing?')) return;

    try {
      const updatedProducts = await productApi.remove(id);
      setProducts(updatedProducts);
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      window.alert(err.message);
    }
  };

  const openProduct = async (product) => {
    try {
      const details = await productApi.getById(product.id);
      setSelected(details);
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleCategory = (name) => {
    const supported = ['Cars', 'Mobiles', 'Bikes', 'Properties', 'Electronics', 'Furniture', 'Fashion'];
    setCategory(supported.includes(name) ? name : 'All');
    document.getElementById('fresh-listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <Header onSell={() => setShowAdd(true)} search={search} setSearch={setSearch} />
      <main>
        <Hero onSell={() => setShowAdd(true)} />
        <CategoryGrid onCategory={handleCategory} />

        <section className="section listings-section" id="fresh-listings">
          <div className="section-heading listings-heading">
            <div>
              <h2>Fresh recommendations</h2>
              {(search || category !== 'All') && !loading && (
                <p>{filtered.length} result{filtered.length !== 1 ? 's' : ''} found</p>
              )}
            </div>
            {(search || category !== 'All') && (
              <button className="clear-filter" onClick={() => { setSearch(''); setCategory('All'); }}>Clear filters</button>
            )}
          </div>

          {error && (
            <div className="api-error">
              <strong>Backend connection failed</strong>
              <p>{error}</p>
              <button onClick={loadProducts}>Retry</button>
            </div>
          )}

          {loading ? (
            <div className="loading-state">Loading products from Express API...</div>
          ) : !error && filtered.length ? (
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onOpen={openProduct} onDelete={deleteProduct} />
              ))}
            </div>
          ) : !error ? (
            <div className="empty-state">
              <div>🔎</div>
              <h3>No ads found</h3>
              <p>Try another search or post a new listing.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }}>Show all ads</button>
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
      {showAdd && <AddProductModal onClose={() => setShowAdd(false)} onAdd={addProduct} />}
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
