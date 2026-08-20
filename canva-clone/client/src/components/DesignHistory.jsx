import { Clock3, Trash2 } from 'lucide-react';

export default function DesignHistory({ designs, onOpen, onDelete }) {
  return (
    <aside className="history-panel">
      <div className="history-title"><Clock3 size={17} /><strong>Recent designs</strong></div>
      {designs.length === 0 && <p className="history-empty">Saved designs will appear here.</p>}
      {designs.slice(0, 6).map((item) => (
        <div className="history-item" key={item._id}>
          <button onClick={() => onOpen(item)}>
            <span className="history-thumb" style={{ background: item.backgroundColor }} />
            <div><strong>{item.title}</strong><small>{new Date(item.updatedAt).toLocaleDateString()}</small></div>
          </button>
          <button className="delete-mini" onClick={() => onDelete(item._id)} aria-label="Delete design"><Trash2 size={15} /></button>
        </div>
      ))}
    </aside>
  );
}
