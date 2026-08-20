import { ImagePlus, LoaderCircle, UploadCloud, X } from 'lucide-react';

export default function UploadPanel({ imageUrl, onUpload, uploading, progress, onRemove }) {
  return (
    <section className="asset-panel">
      <div className="panel-heading"><h2>Uploads</h2><p>Add your logo or a background image.</p></div>
      <label className="upload-dropzone">
        <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])} />
        {uploading ? <LoaderCircle className="spin" size={30} /> : <UploadCloud size={32} />}
        <strong>{uploading ? `Uploading ${progress}%` : 'Upload an image'}</strong>
        <span>PNG, JPG, WEBP up to 5 MB</span>
      </label>
      {imageUrl ? (
        <div className="uploaded-card"><img src={imageUrl} alt="Uploaded visual" /><button onClick={onRemove}><X size={17} /></button></div>
      ) : (
        <div className="empty-upload"><ImagePlus size={30} /><span>Your uploaded images appear here.</span></div>
      )}
    </section>
  );
}
