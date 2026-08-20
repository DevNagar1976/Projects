export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please select an image file' });
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(201).json({
    success: true,
    file: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      imageUrl: fileUrl
    }
  });
};
