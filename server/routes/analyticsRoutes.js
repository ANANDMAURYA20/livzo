const express = require('express');
const router = express.Router();
const {
  getOverview,
  getMonthly,
  getStatusBreakdown,
  getBranchPerformance,
  getUpcomingVisits,
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/overview', getOverview);
router.get('/monthly', getMonthly);
router.get('/status-breakdown', getStatusBreakdown);
router.get('/branch-performance', getBranchPerformance);
router.get('/upcoming-visits', getUpcomingVisits);

module.exports = router;
