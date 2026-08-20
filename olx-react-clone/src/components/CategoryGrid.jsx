const items = [
  ['🚗', 'Cars'], ['🏢', 'Properties'], ['📱', 'Mobiles'], ['💼', 'Jobs'],
  ['🏍️', 'Bikes'], ['💻', 'Electronics'], ['🛋️', 'Furniture'], ['👕', 'Fashion'],
  ['📚', 'Books'], ['🐶', 'Pets'], ['🔧', 'Services'], ['⚽', 'Sports']
];

export default function CategoryGrid({ onCategory }) {
  return (
    <section className="section category-section">
      <div className="section-heading">
        <h2>Browse categories</h2>
      </div>
      <div className="category-grid">
        {items.map(([icon, label]) => (
          <button className="category-item" key={label} onClick={() => onCategory(label)}>
            <span className="category-icon">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
