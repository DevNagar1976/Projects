export default function TextPanel({ design, update }) {
  return (
    <section className="asset-panel">
      <div className="panel-heading"><h2>Text</h2><p>Edit your poster message and typography.</p></div>
      <label className="field-label">Headline<textarea rows="3" value={design.text} onChange={(e) => update('text', e.target.value)} /></label>
      <label className="field-label">Subtitle<input value={design.subtitle} onChange={(e) => update('subtitle', e.target.value)} /></label>
      <label className="field-label">Font family<select value={design.fontFamily} onChange={(e) => update('fontFamily', e.target.value)}><option>Inter</option><option>Georgia</option><option>Arial</option><option>Trebuchet MS</option><option>Courier New</option></select></label>
      <label className="field-label">Headline size <span>{design.fontSize}px</span><input type="range" min="18" max="96" value={design.fontSize} onChange={(e) => update('fontSize', Number(e.target.value))} /></label>
      <div className="alignment-row">
        {['left', 'center', 'right'].map((align) => <button key={align} className={design.textAlign === align ? 'selected' : ''} onClick={() => update('textAlign', align)}>{align}</button>)}
      </div>
    </section>
  );
}
