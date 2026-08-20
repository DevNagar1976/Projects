import Design from '../models/Design.js';

const templates = [
  {
    id: 'aurora',
    name: 'Aurora Launch',
    imageUrl: '/templates/aurora.svg',
    backgroundColor: '#6d28d9',
    accentColor: '#22d3ee',
    textColor: '#ffffff'
  },
  {
    id: 'sunset',
    name: 'Sunset Sale',
    imageUrl: '/templates/sunset.svg',
    backgroundColor: '#f97316',
    accentColor: '#fde047',
    textColor: '#fff7ed'
  },
  {
    id: 'midnight',
    name: 'Midnight Event',
    imageUrl: '/templates/midnight.svg',
    backgroundColor: '#0f172a',
    accentColor: '#a78bfa',
    textColor: '#f8fafc'
  },
  {
    id: 'mint',
    name: 'Mint Workshop',
    imageUrl: '/templates/mint.svg',
    backgroundColor: '#059669',
    accentColor: '#a7f3d0',
    textColor: '#ecfdf5'
  },
  {
    id: 'rose',
    name: 'Rose Promotion',
    imageUrl: '/templates/rose.svg',
    backgroundColor: '#be185d',
    accentColor: '#fbcfe8',
    textColor: '#fff1f2'
  }
];

export const getTemplates = (_req, res) => {
  res.json({ success: true, count: templates.length, templates });
};

export const createDesign = async (req, res, next) => {
  try {
    const { text, templateId } = req.body;
    const template = templates.find((item) => item.id === templateId);

    if (!text?.trim() || !template) {
      return res.status(400).json({
        success: false,
        message: 'text and a valid templateId are required'
      });
    }

    const design = await Design.create({
      ...req.body,
      text: text.trim(),
      templateId: template.id,
      templateName: template.name,
      backgroundColor: req.body.backgroundColor || template.backgroundColor,
      accentColor: req.body.accentColor || template.accentColor,
      textColor: req.body.textColor || template.textColor
    });

    res.status(201).json({ success: true, design });
  } catch (error) {
    next(error);
  }
};

export const getDesigns = async (_req, res, next) => {
  try {
    const designs = await Design.find().sort({ updatedAt: -1 });
    res.json({ success: true, designs });
  } catch (error) {
    next(error);
  }
};

export const getDesign = async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) return res.status(404).json({ success: false, message: 'Design not found' });
    res.json({ success: true, design });
  } catch (error) {
    next(error);
  }
};

export const updateDesign = async (req, res, next) => {
  try {
    const design = await Design.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!design) return res.status(404).json({ success: false, message: 'Design not found' });
    res.json({ success: true, design });
  } catch (error) {
    next(error);
  }
};

export const updateBackground = async (req, res, next) => {
  try {
    const { backgroundColor } = req.body;
    if (!/^#[0-9A-Fa-f]{6}$/.test(backgroundColor || '')) {
      return res.status(400).json({ success: false, message: 'Use a valid hex color such as #7c3aed' });
    }

    const design = await Design.findByIdAndUpdate(
      req.params.id,
      { backgroundColor },
      { new: true, runValidators: true }
    );
    if (!design) return res.status(404).json({ success: false, message: 'Design not found' });
    res.json({ success: true, design });
  } catch (error) {
    next(error);
  }
};

export const deleteDesign = async (req, res, next) => {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);
    if (!design) return res.status(404).json({ success: false, message: 'Design not found' });
    res.json({ success: true, message: 'Design deleted' });
  } catch (error) {
    next(error);
  }
};
