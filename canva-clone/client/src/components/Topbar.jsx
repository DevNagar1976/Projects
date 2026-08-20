import { Download, Menu, Redo2, Save, Undo2 } from 'lucide-react';

export default function Topbar({ title, setTitle, onSave, onDownload, saving }) {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <button className="icon-button mobile-menu" aria-label="Open menu"><Menu size={20} /></button>
        <div className="logo"><img src="https://static.canva.com/web/images/856bac30504ecac8dbd38dbee61de1f1.svg" alt="Canva Logo" height="30" width="30" /></div>
        <div>
          <strong>Canva</strong>
          <span>Visual design studio</span>
        </div>
      </div>

      <div className="document-actions">
        <button className="icon-button" aria-label="Undo"><Undo2 size={18} /></button>
        <button className="icon-button" aria-label="Redo"><Redo2 size={18} /></button>
        <input
          className="title-input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-label="Design title"
        />
      </div>

      <div className="topbar-actions">
        <button className="secondary-button" onClick={onDownload}><Download size={17} /> Export</button>
        <button className="primary-button" onClick={onSave} disabled={saving}><Save size={17} /> {saving ? 'Saving...' : 'Save design'}</button>
        <div className="avatar">HP</div>
      </div>
    </header>
  );
}
