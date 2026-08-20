import { Search } from 'lucide-react';

export default function TemplatePanel({ templates, selectedId, onSelect, loading }) {
  return (
    <section className="asset-panel">
      <div className="panel-heading">
        <h2>Templates</h2>
        <p>Pick a starting point and make it yours.</p>
      </div>
      <label className="search-box"><Search size={17} /><input placeholder="Search poster templates" /></label>
      <div className="template-grid">
        {loading && Array.from({ length: 5 }).map((_, index) => <div className="template-skeleton" key={index} />)}
        {!loading && templates.map((template) => (
          <button
            className={`template-card ${selectedId === template.id ? 'selected' : ''}`}
            key={template.id}
            onClick={() => onSelect(template)}
          >
            <img src={template.imageUrl} alt={template.name} />
            <span>{template.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
