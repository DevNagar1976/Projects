import { Image, LayoutTemplate, Shapes, Sparkles, Type, UploadCloud } from 'lucide-react';

const tabs = [
  ['templates', LayoutTemplate, 'Templates'],
  ['text', Type, 'Text'],
  ['uploads', UploadCloud, 'Uploads'],
  ['elements', Shapes, 'Elements'],
  ['photos', Image, 'Photos']
];

export default function LeftSidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="left-sidebar">
      <div className="magic-card"><Sparkles size={18} /><span>Magic Design</span></div>
      <nav>
        {tabs.map(([id, Icon, label]) => (
          <button key={id} className={activeTab === id ? 'active' : ''} onClick={() => setActiveTab(id)}>
            <Icon size={21} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
