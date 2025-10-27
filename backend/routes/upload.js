const express = require('express');
const { uploadSingle, uploadMultiple, deleteImage } = require('../utils/cloudinary');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/upload/single
// @desc    Upload single image
// @access  Private
router.post('/single', auth, (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ 
        message: 'Upload failed', 
        error: err.message 
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      message: 'Image uploaded successfully',
      image: {
        url: req.file.path,
        publicId: req.file.filename,
        secureUrl: req.file.path
      }
    });
  });
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple images
// @access  Private
router.post('/multiple', auth, (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ 
        message: 'Upload failed', 
        error: err.message 
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const images = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      secureUrl: file.path
    }));

    res.json({
      message: 'Images uploaded successfully',
      images
    });
  });
});

// @route   DELETE /api/upload/:publicId
// @desc    Delete image from Cloudinary
// @access  Private
router.delete('/:publicId', auth, async (req, res) => {
  try {
    const { publicId } = req.params;
    
    const result = await deleteImage(publicId);
    
    if (result.result === 'ok') {
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ message: 'Server error during image deletion' });
  }
});

module.exports = router;
