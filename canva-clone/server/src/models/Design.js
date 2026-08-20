import mongoose from 'mongoose';

const designSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: 'Untitled design' },
    text: { type: String, trim: true, default: 'Create something amazing' },
    subtitle: { type: String, trim: true, default: 'Designed with Canvasly' },
    templateId: { type: String, required: true },
    templateName: { type: String, required: true },
    backgroundColor: { type: String, default: '#7c3aed' },
    textColor: { type: String, default: '#ffffff' },
    accentColor: { type: String, default: '#22d3ee' },
    fontSize: { type: Number, default: 52, min: 18, max: 96 },
    fontFamily: { type: String, default: 'Inter' },
    textAlign: { type: String, enum: ['left', 'center', 'right'], default: 'center' },
    imageUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Design', designSchema);
