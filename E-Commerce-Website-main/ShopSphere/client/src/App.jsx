import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  LockKeyhole,
  LogOut,
  Menu,
  Minus,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Trash2,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { api, getToken, setToken } from "./api/client.js";
import heroImage from "./assets/hero-warm-editorial.png";
import sheetA from "./assets/products-sheet-a.png";
import sheetB from "./assets/products-sheet-b.png";
import { categories, products } from "./data/products.js";

const CART_KEY = "shopsphere-cart";
const WISHLIST_KEY = "shopsphere-wishlist";
const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function readStorage(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function ProductImage({ product, className = "" }) {
  return (
    <div
      className={`product-image ${className}`}
      role="img"
      aria-label={product.name}
      style={{
        backgroundImage: `url(${product.sheet === "a" ? sheetA : sheetB})`,
        backgroundPosition: product.position,
      }}
    />
  );
}

function productKey(product) {
  return product?._id || product?.id;
}

function cartFromServer(serverCart) {
  return (serverCart?.items || []).map((item) => ({
    productId: productKey(item.product),
    quantity: item.quantity,
  }));
}

export default function App() {
  const [catalog, setCatalog] = useState(products);
  const [cart, setCart] = useState(() => readStorage(CART_KEY));
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authBusy, setAuthBusy] = useState(false);
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "Gujarat",
    postalCode: "",
  });
  const shopRef = useRef(null);

  useEffect(() => {
    let active = true;
    async function initialize() {
      try {
        const result = await api.products({ limit: 100, sort: "featured" });
        if (active && result.products?.length) setCatalog(result.products);
      } catch {
        if (active) notify("Backend offline — using local demo products");
      }

      if (getToken()) {
        try {
          const [profile, serverCart] = await Promise.all([api.me(), api.getCart()]);
          if (active) {
            setUser(profile.user);
            setCart(cartFromServer(serverCart.cart));
          }
        } catch {
          setToken(null);
        }
      }
    }
    initialize();
    return () => { active = false; };
  }, []);

  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)), [wishlist]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || menuOpen || authOpen || checkoutOpen ? "hidden" : "";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setMenuOpen(false);
        setAuthOpen(false);
        setCheckoutOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [cartOpen, menuOpen, authOpen, checkoutOpen]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const visibleProducts = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    const result = catalog.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery =
        !cleanQuery ||
        product.name.toLowerCase().includes(cleanQuery) ||
        product.category.toLowerCase().includes(cleanQuery);
      return matchesCategory && matchesQuery;
    });

    return [...result].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return Number(a.legacyId || a.id || 0) - Number(b.legacyId || b.id || 0);
    });
  }, [catalog, category, query, sort]);

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => ({
          ...item,
          product: catalog.find(
            (product) =>
              String(productKey(product)) === String(item.productId) ||
              String(product.legacyId) === String(item.productId),
          ),
        }))
        .filter((item) => item.product),
    [cart, catalog],
  );

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = subtotal ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + delivery;

  function notify(message) {
    setToast(message);
  }

  function showShop(nextCategory = category) {
    setCategory(nextCategory);
    setMenuOpen(false);
    requestAnimationFrame(() => shopRef.current?.scrollIntoView({ behavior: "smooth" }));
  }

  async function addToCart(productId) {
    if (user) {
      try {
        const result = await api.addToCart(productId, 1);
        setCart(cartFromServer(result.cart));
        notify("Item added to your saved cart");
        return;
      } catch (error) {
        notify(error.message);
        return;
      }
    }
    setCart((current) => {
      const found = current.find((item) => item.productId === productId);
      return found
        ? current.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...current, { productId, quantity: 1 }];
    });
    notify(`${catalog.find((product) => String(productKey(product)) === String(productId))?.name} added to cart`);
  }

  async function updateQuantity(productId, quantity) {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    if (user) {
      try {
        const result = await api.updateCart(productId, quantity);
        setCart(cartFromServer(result.cart));
      } catch (error) {
        notify(error.message);
      }
      return;
    }
    setCart((current) =>
      current.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    );
  }

  async function removeItem(productId) {
    if (user) {
      try {
        const result = await api.removeCartItem(productId);
        setCart(cartFromServer(result.cart));
        notify("Item removed from your saved cart");
      } catch (error) {
        notify(error.message);
      }
      return;
    }
    setCart((current) => current.filter((item) => item.productId !== productId));
    notify("Item removed from cart");
  }

  async function clearCart() {
    if (user) {
      try {
        const result = await api.clearCart();
        setCart(cartFromServer(result.cart));
      } catch (error) {
        notify(error.message);
      }
      return;
    }
    setCart([]);
  }

  function toggleWishlist(productId) {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  function submitSearch(event) {
    event.preventDefault();
    showShop();
  }

  function subscribe(event) {
    event.preventDefault();
    notify("Welcome to the ShopSphere list!");
    setEmail("");
  }

  async function submitAuth(event) {
    event.preventDefault();
    setAuthBusy(true);
    try {
      const result = authMode === "register"
        ? await api.register(authForm)
        : await api.login({ email: authForm.email, password: authForm.password });
      setToken(result.token);
      setUser(result.user);
      setShipping((current) => ({ ...current, fullName: result.user.name }));
      const serverCart = await api.getCart();
      setCart(cartFromServer(serverCart.cart));
      setAuthOpen(false);
      setAuthForm({ name: "", email: "", password: "" });
      notify(`Welcome, ${result.user.name}!`);
    } catch (error) {
      notify(error.message);
    } finally {
      setAuthBusy(false);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    setCart([]);
    notify("You are logged out");
  }

  function startCheckout() {
    if (!user) {
      setAuthMode("login");
      setAuthOpen(true);
      notify("Log in before checkout");
      return;
    }
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  async function placeOrder(event) {
    event.preventDefault();
    setCheckoutBusy(true);
    try {
      const result = await api.createOrder({ shippingAddress: shipping, paymentMethod: "cod" });
      setCart([]);
      setCheckoutOpen(false);
      notify(`Order ${result.order._id.slice(-6).toUpperCase()} placed successfully`);
    } catch (error) {
      notify(error.message);
    } finally {
      setCheckoutBusy(false);
    }
  }

  return (
    <div className="app-shell" id="top">
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="promo-bar">
        <span>Summer Sale: Up to 30% off sitewide — Limited time only!</span>
        <button type="button" onClick={() => showShop("All")}>Shop the sale <ArrowRight size={16} /></button>
      </div>

      <header className="site-header">
        <div className="header-content">
          <a href="#top" className="brand" aria-label="ShopSphere home">ShopSphere</a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a className="active" href="#top">Home</a>
            <button type="button" onClick={() => showShop("All")}>Shop</button>
            <a href="#categories">Categories</a>
            <a href="#deals">Deals</a>
          </nav>

          <form className="search-box" role="search" onSubmit={submitSearch}>
            <Search size={20} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, categories and more"
              aria-label="Search products"
            />
          </form>

          <div className="header-actions">
            <button
              className="icon-button account-button"
              type="button"
              aria-label={user ? `Signed in as ${user.name}` : "Login or register"}
              title={user ? user.name : "Login / Register"}
              onClick={() => user ? notify(`Signed in as ${user.email}`) : setAuthOpen(true)}
            ><UserRound /></button>
            {user && <button className="icon-button logout-button" type="button" aria-label="Log out" onClick={logout}><LogOut size={20} /></button>}
            <button className="icon-button cart-button" type="button" aria-label={`Open cart with ${count} items`} onClick={() => setCartOpen(true)}>
              <ShoppingBag />
              {count > 0 && <span>{count}</span>}
            </button>
            <button className="icon-button menu-button" type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Curated for everyday living</p>
            <h1>Everything you love, delivered.</h1>
            <p className="hero-description">Thoughtful finds selected for quality, comfort, and a little more joy in every day.</p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => showShop("All")}>Shop now <ArrowRight size={18} /></button>
              <span>Loved by 2,000+ shoppers</span>
            </div>
          </div>
          <div className="hero-photo">
            <img src={heroImage} alt="Warm home collection with woven bag, mug, candle and olive branches" />
            <span className="hero-stamp">New season<br />essentials</span>
          </div>
          <div className="paint-shape" aria-hidden="true" />
        </section>

        <section className="benefit-strip" aria-label="Shop benefits">
          <article><span><Truck /></span><div><strong>Fast delivery</strong><small>Across India</small></div></article>
          <article><span><RefreshCw /></span><div><strong>Easy 30-day returns</strong><small>Simple and stress-free</small></div></article>
          <article><span><ShieldCheck /></span><div><strong>Secure checkout</strong><small>Your details stay protected</small></div></article>
        </section>

        <section className="section category-section" id="categories">
          <div className="section-title">
            <div><p className="eyebrow">Find your favourites</p><h2>Shop by category</h2></div>
            <button className="text-button" type="button" onClick={() => showShop("All")}>View all categories <ArrowRight size={17} /></button>
          </div>
          <div className="category-grid">
            {[
              { name: "Home & Living", text: "Warm, useful, beautiful", product: products[0] },
              { name: "Fashion", text: "Everyday statements", product: products[1] },
              { name: "Electronics", text: "Smart essentials", product: products[4] },
              { name: "Wellness", text: "Slow down and reset", product: products[2] },
            ].map((item) => (
              <button className="category-card" type="button" key={item.name} onClick={() => showShop(item.name)}>
                <ProductImage product={item.product} />
                <span className="category-copy"><strong>{item.name}</strong><small>{item.text}</small></span>
                <span className="category-arrow"><ArrowRight size={17} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="section products-section" id="shop" ref={shopRef}>
          <div className="section-title product-title">
            <div><p className="eyebrow">Handpicked for you</p><h2>Shop our favourites</h2><p>{visibleProducts.length} thoughtful finds ready to explore.</p></div>
            <label className="sort-box">
              <span>Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: Low to high</option>
                <option value="high">Price: High to low</option>
                <option value="rating">Top rated</option>
              </select>
              <ChevronDown size={16} />
            </label>
          </div>

          <div className="filter-row" aria-label="Product filters">
            {categories.map((item) => (
              <button type="button" className={item === category ? "selected" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>

          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={productKey(product)}>
                  <div className="product-image-wrap">
                    <ProductImage product={product} />
                    <span className="product-badge">{product.badge}</span>
                    <button
                      className={`heart-button ${wishlist.includes(productKey(product)) ? "saved" : ""}`}
                      type="button"
                      aria-label={wishlist.includes(productKey(product)) ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
                      onClick={() => toggleWishlist(productKey(product))}
                    >
                      <Heart size={19} fill={wishlist.includes(productKey(product)) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <div className="rating"><Star size={14} fill="currentColor" /><strong>{product.rating}</strong><span>({product.reviews})</span></div>
                    <div className="product-footer">
                      <div><strong>{money.format(product.price)}</strong><del>{money.format(product.oldPrice)}</del></div>
                      <button type="button" aria-label={`Add ${product.name} to cart`} onClick={() => addToCart(productKey(product))}><Plus size={19} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <Search size={32} /><h3>No products found</h3><p>Try a different search or clear the filters.</p>
              <button className="outline-button" type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button>
            </div>
          )}
        </section>

        <section className="section" id="deals">
          <div className="deal-card">
            <div>
              <p className="eyebrow">Weekend edit</p>
              <h2>Small comforts, lovely prices.</h2>
              <p>Save up to 30% on home, wellness, and everyday essentials.</p>
              <button type="button" onClick={() => showShop("All")}>Explore the edit <ArrowRight size={18} /></button>
            </div>
            <div className="deal-circle"><strong>30%</strong><span>off selected finds</span></div>
          </div>
        </section>

        <section className="section value-grid">
          <article><Truck /><h3>Considered quality</h3><p>Every product is selected for lasting materials and everyday usefulness.</p></article>
          <article><Heart /><h3>Made to feel personal</h3><p>Collections that help your home and style feel more like your own.</p></article>
          <article><Check /><h3>Simple from start to finish</h3><p>Clear pricing, friendly support, and an easy return promise.</p></article>
        </section>

        <section className="section newsletter">
          <div><p className="eyebrow">A lovely note, now and then</p><h2>Fresh finds, straight to your inbox.</h2><p>Get first access to new collections, offers, and inspiration.</p></div>
          <form onSubmit={subscribe}>
            <label className="sr-only" htmlFor="email">Email address</label>
            <input id="email" type="email" required placeholder="Enter your email address" value={email} onChange={(event) => setEmail(event.target.value)} />
            <button type="submit">Join the list <ArrowRight size={17} /></button>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-grid section">
          <div className="footer-brand"><a className="brand" href="#top">ShopSphere</a><p>Thoughtful finds for a warmer, happier everyday.</p></div>
          <div><h3>Shop</h3><a href="#shop">New arrivals</a><a href="#shop">Bestsellers</a><a href="#deals">Offers</a></div>
          <div><h3>Help</h3><a href="#top">Delivery</a><a href="#top">Returns</a><a href="#top">Contact</a></div>
          <div><h3>About</h3><a href="#top">Our story</a><a href="#top">Journal</a><a href="#top">Careers</a></div>
        </div>
        <div className="footer-bottom section"><span>© 2026 ShopSphere. Full-stack MERN assignment.</span><span>React + Node.js + MongoDB</span></div>
      </footer>

      {(cartOpen || menuOpen) && <button className="overlay" type="button" aria-label="Close panel" onClick={() => { setCartOpen(false); setMenuOpen(false); }} />}

      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <div className="drawer-header"><div><h2>Your cart</h2><span>{count} {count === 1 ? "item" : "items"}</span></div><button className="icon-button" type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}><X /></button></div>
        {cartItems.length ? (
          <>
            <div className="cart-list">
              {cartItems.map(({ product, quantity }) => (
                <article className="cart-item" key={productKey(product)}>
                  <ProductImage product={product} />
                  <div className="cart-copy">
                    <span>{product.category}</span><h3>{product.name}</h3><strong>{money.format(product.price)}</strong>
                    <div className="cart-controls">
                      <div><button type="button" onClick={() => updateQuantity(productKey(product), quantity - 1)} aria-label="Decrease quantity"><Minus size={14} /></button><span>{quantity}</span><button type="button" onClick={() => updateQuantity(productKey(product), quantity + 1)} aria-label="Increase quantity"><Plus size={14} /></button></div>
                      <button type="button" className="remove-button" aria-label={`Remove ${product.name}`} onClick={() => removeItem(productKey(product))}><Trash2 size={16} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <p><span>Subtotal</span><strong>{money.format(subtotal)}</strong></p>
              <p><span>Delivery (5%)</span><strong>{money.format(delivery)}</strong></p>
              <p className="total-row"><span>Total</span><strong>{money.format(total)}</strong></p>
              <button className="checkout-button" type="button" onClick={startCheckout}>Proceed to checkout <LockKeyhole size={17} /></button>
              <button className="clear-button" type="button" onClick={clearCart}>Clear cart</button>
            </div>
          </>
        ) : (
          <div className="empty-cart"><span><ShoppingBag size={32} /></span><h2>Your cart is waiting</h2><p>Add a few thoughtful finds and they will appear here.</p><button className="primary-button" type="button" onClick={() => { setCartOpen(false); showShop("All"); }}>Start shopping</button></div>
        )}
      </aside>

      <aside className={`mobile-drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawer-header"><a className="brand" href="#top" onClick={() => setMenuOpen(false)}>ShopSphere</a><button className="icon-button" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></button></div>
        <nav>
          <button type="button" onClick={() => { setMenuOpen(false); user ? notify(`Signed in as ${user.email}`) : setAuthOpen(true); }}>{user ? `Hi, ${user.name}` : "Login / Register"} <UserRound size={18} /></button>
          <a href="#top" onClick={() => setMenuOpen(false)}>Home <ArrowRight size={18} /></a>
          <button type="button" onClick={() => showShop("All")}>Shop <ArrowRight size={18} /></button>
          <button type="button" onClick={() => showShop("Home & Living")}>Home & Living <ArrowRight size={18} /></button>
          <button type="button" onClick={() => showShop("Fashion")}>Fashion <ArrowRight size={18} /></button>
          <button type="button" onClick={() => showShop("Electronics")}>Electronics <ArrowRight size={18} /></button>
          <a href="#deals" onClick={() => setMenuOpen(false)}>Deals <ArrowRight size={18} /></a>
        </nav>
      </aside>

      {authOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAuthOpen(false); }}>
          <section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
            <button className="modal-close" type="button" aria-label="Close" onClick={() => setAuthOpen(false)}><X /></button>
            <p className="eyebrow">Your ShopSphere account</p>
            <h2 id="auth-title">{authMode === "login" ? "Welcome back." : "Create your account."}</h2>
            <p>{authMode === "login" ? "Log in to save your cart and place orders." : "Register to use the complete backend features."}</p>
            <form onSubmit={submitAuth}>
              {authMode === "register" && (
                <label>Full name<input required minLength="2" value={authForm.name} onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })} placeholder="Hanjari Prajapati" /></label>
              )}
              <label>Email address<input required type="email" value={authForm.email} onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })} placeholder="you@example.com" /></label>
              <label>Password<input required type="password" minLength="8" value={authForm.password} onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })} placeholder="8+ characters with a number" /></label>
              <button className="checkout-button" type="submit" disabled={authBusy}>{authBusy ? "Please wait..." : authMode === "login" ? "Log in" : "Create account"}</button>
            </form>
            <button className="switch-auth" type="button" onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
              {authMode === "login" ? "New here? Create an account" : "Already registered? Log in"}
            </button>
          </section>
        </div>
      )}

      {checkoutOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}>
          <section className="form-modal checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            <button className="modal-close" type="button" aria-label="Close" onClick={() => setCheckoutOpen(false)}><X /></button>
            <p className="eyebrow">Secure order</p>
            <h2 id="checkout-title">Delivery details.</h2>
            <p>Cash on delivery · Total {money.format(total)}</p>
            <form className="shipping-form" onSubmit={placeOrder}>
              <label>Full name<input required value={shipping.fullName} onChange={(event) => setShipping({ ...shipping, fullName: event.target.value })} /></label>
              <label>Phone<input required inputMode="tel" pattern="[0-9+ -]{8,16}" value={shipping.phone} onChange={(event) => setShipping({ ...shipping, phone: event.target.value })} /></label>
              <label className="full-field">Address<input required minLength="5" value={shipping.address} onChange={(event) => setShipping({ ...shipping, address: event.target.value })} /></label>
              <label>City<input required value={shipping.city} onChange={(event) => setShipping({ ...shipping, city: event.target.value })} /></label>
              <label>State<input required value={shipping.state} onChange={(event) => setShipping({ ...shipping, state: event.target.value })} /></label>
              <label className="full-field">PIN code<input required inputMode="numeric" pattern="[0-9]{6}" maxLength="6" value={shipping.postalCode} onChange={(event) => setShipping({ ...shipping, postalCode: event.target.value })} /></label>
              <button className="checkout-button full-field" type="submit" disabled={checkoutBusy}>{checkoutBusy ? "Placing order..." : `Place order · ${money.format(total)}`}</button>
            </form>
          </section>
        </div>
      )}

      {toast && <div className="toast" role="status"><Check size={17} />{toast}</div>}
    </div>
  );
}
