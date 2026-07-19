const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry,
  updateStatus,
} = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

// Public route for creating an inquiry
router.post('/', createInquiry);

router.use(protect);

router.get('/', getInquiries);
router.route('/:id').get(getInquiry).put(updateInquiry).delete(deleteInquiry);
router.patch('/:id/status', updateStatus);

module.exports = router;
