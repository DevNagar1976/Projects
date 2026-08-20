import { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import DesignCanvas from './components/DesignCanvas';
import DesignHistory from './components/DesignHistory';
import EditorToolbar from './components/EditorToolbar';
import ElementsPanel from './components/ElementsPanel';
import LeftSidebar from './components/LeftSidebar';
import TemplatePanel from './components/TemplatePanel';
import TextPanel from './components/TextPanel';
import Topbar from './components/Topbar';
import UploadPanel from './components/UploadPanel';
import { designApi, templateApi, uploadApi } from './services/api';

const initialDesign = {
  _id: null,
  title: 'Social Media Poster',
  text: 'DESIGN WITHOUT LIMITS',
  subtitle: 'Turn your ideas into scroll-stopping visuals.',
  templateId: 'aurora',
  templateName: 'Aurora Launch',
  backgroundColor: '#6d28d9',
  accentColor: '#22d3ee',
  textColor: '#ffffff',
  fontSize: 56,
  fontFamily: 'Inter',
  textAlign: 'center',
  imageUrl: ''
};

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [design, setDesign] = useState(initialDesign);
  const [activeTab, setActiveTab] = useState('templates');
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zoom, setZoom] = useState(86);
  const canvasRef = useRef(null);

  const apiOrigin = useMemo(() => (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', ''), []);

  useEffect(() => {
    const load = async () => {
      try {
        const [templateResponse, designResponse] = await Promise.all([templateApi.getAll(), designApi.getAll()]);
        const normalized = templateResponse.data.templates.map((item) => ({
          ...item,
          imageUrl: item.imageUrl.startsWith('http') ? item.imageUrl : `${window.location.origin}${item.imageUrl}`
        }));
        setTemplates(normalized);
        setDesigns(designResponse.data.designs);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Start the backend server to load data');
      } finally {
        setLoadingTemplates(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    // Template previews live in the Vite public folder, so keep their browser URLs local.
    setTemplates((current) => current.map((item) => ({ ...item, imageUrl: item.imageUrl.replace(apiOrigin, '') })));
  }, [apiOrigin]);

  const update = (key, value) => setDesign((current) => ({ ...current, [key]: value }));

  const selectTemplate = (template) => {
    setDesign((current) => ({
      ...current,
      templateId: template.id,
      templateName: template.name,
      backgroundColor: template.backgroundColor,
      accentColor: template.accentColor,
      textColor: template.textColor
    }));
  };

  const saveDesign = async () => {
    if (!design.text.trim()) return toast.error('Headline cannot be empty');
    setSaving(true);
    try {
      const payload = { ...design };
      delete payload._id;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.__v;

      const response = design._id
        ? await designApi.update(design._id, payload)
        : await designApi.create(payload);

      const saved = response.data.design;
      setDesign(saved);
      setDesigns((items) => [saved, ...items.filter((item) => item._id !== saved._id)]);
      toast.success('Design saved to MongoDB');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save design');
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file) => {
    setUploading(true);
    setProgress(0);
    try {
      const response = await uploadApi.image(file, (event) => {
        setProgress(Math.round((event.loaded * 100) / (event.total || 1)));
      });
      update('imageUrl', response.data.file.imageUrl);
      toast.success('Image uploaded');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const deleteDesign = async (id) => {
    try {
      await designApi.remove(id);
      setDesigns((items) => items.filter((item) => item._id !== id));
      if (design._id === id) setDesign(initialDesign);
      toast.success('Design deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const exportDesign = () => {
    const escapeXml = (value = '') => String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('\"', '&quot;')
      .replaceAll("'", '&apos;');

    const alignMap = { left: 'start', center: 'middle', right: 'end' };
    const xMap = { left: 100, center: 540, right: 980 };
    const imageLayer = design.imageUrl
      ? `<image href="${escapeXml(design.imageUrl)}" width="1080" height="1080" preserveAspectRatio="xMidYMid slice" opacity="0.72"/>`
      : '';

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${design.backgroundColor}"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0f172a" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#0f172a" stop-opacity="0.62"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#background)"/>
  ${imageLayer}
  <rect width="1080" height="1080" fill="url(#overlay)"/>
  <circle cx="940" cy="105" r="230" fill="${design.accentColor}" opacity="0.58"/>
  <circle cx="30" cy="875" r="145" fill="${design.accentColor}" opacity="0.28"/>
  <rect x="96" y="96" width="52" height="8" rx="4" fill="${design.accentColor}"/>
  <text x="170" y="108" fill="${design.textColor}" font-family="${escapeXml(design.fontFamily)}" font-size="20" font-weight="800" letter-spacing="4">CREATE • SHARE • INSPIRE</text>
  <text x="${xMap[design.textAlign]}" y="520" text-anchor="${alignMap[design.textAlign]}" fill="${design.textColor}" font-family="${escapeXml(design.fontFamily)}" font-size="${Math.round(design.fontSize * 1.9)}" font-weight="900">${escapeXml(design.text)}</text>
  <text x="${xMap[design.textAlign]}" y="610" text-anchor="${alignMap[design.textAlign]}" fill="${design.textColor}" font-family="${escapeXml(design.fontFamily)}" font-size="32" opacity="0.92">${escapeXml(design.subtitle)}</text>
  <text x="96" y="995" fill="${design.accentColor}" font-family="Arial" font-size="28" font-weight="900" letter-spacing="2">CANVASLY</text>
  <text x="984" y="995" text-anchor="end" fill="${design.textColor}" font-family="Arial" font-size="20" letter-spacing="3">YOURSTUDIO.COM</text>
</svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${design.title.replace(/\s+/g, '-').toLowerCase() || 'canvasly-design'}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('SVG poster exported');
  };

  const renderPanel = () => {
    if (activeTab === 'text') return <TextPanel design={design} update={update} />;
    if (activeTab === 'uploads') return <UploadPanel imageUrl={design.imageUrl} onUpload={uploadImage} uploading={uploading} progress={progress} onRemove={() => update('imageUrl', '')} />;
    if (activeTab === 'elements' || activeTab === 'photos') return <ElementsPanel />;
    return <TemplatePanel templates={templates} selectedId={design.templateId} onSelect={selectTemplate} loading={loadingTemplates} />;
  };

  return (
    <div className="app-shell">
      <Topbar title={design.title} setTitle={(value) => update('title', value)} onSave={saveDesign} onDownload={exportDesign} saving={saving} />
      <div className="workspace-grid">
        <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderPanel()}
        <main className="editor-area">
          <EditorToolbar design={design} update={update} zoom={zoom} setZoom={setZoom} />
          <DesignCanvas design={design} zoom={zoom} canvasRef={canvasRef} />
          <div className="statusbar"><span>All changes are stored when you click Save design.</span><strong>1080 × 1080 px</strong></div>
        </main>
        <DesignHistory designs={designs} onOpen={setDesign} onDelete={deleteDesign} />
      </div>
    </div>
  );
}
