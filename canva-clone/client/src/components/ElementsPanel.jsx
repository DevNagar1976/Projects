import { Circle, Heart, Sparkle, Star, Triangle } from 'lucide-react';

export default function ElementsPanel() {
  const icons = [Circle, Triangle, Star, Heart, Sparkle];
  return (
    <section className="asset-panel">
      <div className="panel-heading"><h2>Elements</h2><p>Decorative shapes for your next version.</p></div>
      <div className="element-grid">{icons.map((Icon, index) => <button key={index}><Icon size={32} /></button>)}</div>
      <div className="info-note">Element dragging can be added later with Fabric.js or Konva. This assignment focuses on MERN APIs, templates, uploads and design persistence.</div>
    </section>
  );
}
