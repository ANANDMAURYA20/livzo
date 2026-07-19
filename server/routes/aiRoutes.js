const express = require('express');
const router = express.Router();
const { generateWhatsApp } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/whatsapp', protect, generateWhatsApp);

module.exports = router;
