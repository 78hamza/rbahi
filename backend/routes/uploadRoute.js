const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const analysisController = require('../controllers/analysisController');

// Set up multer to store files in /uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// POST route to upload a file and analyze it
router.post('/upload', upload.single('file'), analysisController.analyzeFile);

module.exports = router;