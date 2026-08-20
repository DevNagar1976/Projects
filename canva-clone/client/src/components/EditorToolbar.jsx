import { AlignCenter, Bold, Italic, Minus, Plus } from 'lucide-react';

export default function EditorToolbar({ design, update, zoom, setZoom }) {
  return (
    <div className="editor-toolbar">
      <button><Bold size={17} /></button><button><Italic size={17} /></button><button><AlignCenter size={17} /></button>
      <div className="toolbar-divider" />
      <label className="color-control">Text <input type="color" value={design.textColor} onChange={(e) => update('textColor', e.target.value)} /></label>
      <label className="color-control">Background <input type="color" value={design.backgroundColor} onChange={(e) => update('backgroundColor', e.target.value)} /></label>
      <label className="color-control">Accent <input type="color" value={design.accentColor} onChange={(e) => update('accentColor', e.target.value)} /></label>
      <div className="zoom-controls"><button onClick={() => setZoom(Math.max(50, zoom - 10))}><Minus size={15} /></button><span>{zoom}%</span><button onClick={() => setZoom(Math.min(120, zoom + 10))}><Plus size={15} /></button></div>
    </div>
  );
}
