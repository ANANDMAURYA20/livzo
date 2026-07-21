const Inquiry = require('../models/Inquiry');

// @desc    Get analytics overview
// @route   GET /api/analytics/overview
// @access  Private
const getOverview = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [total, todayCount, visitScheduled, joined, rejected] = await Promise.all([
      Inquiry.countDocuments({ isDeleted: false }),
      Inquiry.countDocuments({ isDeleted: false, createdAt: { $gte: today, $lt: tomorrow } }),
      Inquiry.countDocuments({ isDeleted: false, status: 'Visit Scheduled' }),
      Inquiry.countDocuments({ isDeleted: false, status: 'Joined' }),
      Inquiry.countDocuments({ isDeleted: false, status: 'Rejected' }),
    ]);

    res.status(200).json({
      success: true,
      data: { total, today: todayCount, visitScheduled, joined, rejected },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get monthly inquiry data
// @route   GET /api/analytics/monthly
// @access  Private
const getMonthly = async (req, res, next) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const data = await Inquiry.aggregate([
      { $match: { isDeleted: false, createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Fill in missing months to ensure exactly 6 months are returned in order
    const formatted = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - i));
      const year = d.getFullYear();
      const monthIndex = d.getMonth() + 1; // 1-12
      
      const found = data.find(x => x._id.year === year && x._id.month === monthIndex);
      formatted.push({
        month: months[monthIndex - 1],
        year: year,
        count: found ? found.count : 0
      });
    }

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
};

// @desc    Get status breakdown
// @route   GET /api/analytics/status-breakdown
// @access  Private
const getStatusBreakdown = async (req, res, next) => {
  try {
    const data = await Inquiry.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const formatted = data.map((d) => ({
      name: d._id,
      value: d.count,
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
};

// @desc    Get branch performance
// @route   GET /api/analytics/branch-performance
// @access  Private
const getBranchPerformance = async (req, res, next) => {
  try {
    const data = await Inquiry.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: '$branch',
          total: { $sum: 1 },
          joined: {
            $sum: { $cond: [{ $eq: ['$status', 'Joined'] }, 1, 0] },
          },
          avgBudget: { $avg: '$budget' },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 10 },
    ]);

    const formatted = data.map((d) => ({
      branch: d._id || 'Unknown',
      total: d.total,
      joined: d.joined,
      avgBudget: Math.round(d.avgBudget || 0),
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
};

// @desc    Get upcoming visits
// @route   GET /api/analytics/upcoming-visits
// @access  Private
const getUpcomingVisits = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const visits = await Inquiry.find({
      isDeleted: false,
      visitDate: { $gte: today },
      status: { $nin: ['Joined', 'Rejected'] },
    })
      .sort({ visitDate: 1 })
      .limit(5)
      .select('name branch visitDate status mobile');

    res.status(200).json({ success: true, data: visits });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview,
  getMonthly,
  getStatusBreakdown,
  getBranchPerformance,
  getUpcomingVisits,
};
