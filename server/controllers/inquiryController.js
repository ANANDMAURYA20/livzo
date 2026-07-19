const Inquiry = require('../models/Inquiry');

// @desc    Create inquiry
// @route   POST /api/inquiries
// @access  Private
const createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, inquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private
const getInquiries = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      branch,
      budgetMin,
      budgetMax,
      dateFrom,
      dateTo,
      visitDateFrom,
      visitDateTo,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const query = { isDeleted: false };

    // Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { branch: { $regex: search, $options: 'i' } },
      ];
    }

    // Filters
    if (status && status !== 'all') query.status = status;
    if (branch && branch !== 'all') query.branch = { $regex: branch, $options: 'i' };
    if (budgetMin || budgetMax) {
      query.budget = {};
      if (budgetMin) query.budget.$gte = Number(budgetMin);
      if (budgetMax) query.budget.$lte = Number(budgetMax);
    }
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(new Date(dateTo).setHours(23, 59, 59, 999));
    }
    if (visitDateFrom || visitDateTo) {
      query.visitDate = {};
      if (visitDateFrom) query.visitDate.$gte = new Date(visitDateFrom);
      if (visitDateTo) query.visitDate.$lte = new Date(visitDateTo);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query).sort(sort).skip(skip).limit(Number(limit)),
      Inquiry.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      inquiries,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single inquiry
// @route   GET /api/inquiries/:id
// @access  Private
const getInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findOne({ _id: req.params.id, isDeleted: false });
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, inquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry
// @route   PUT /api/inquiries/:id
// @access  Private
const updateInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true, runValidators: true }
    );
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, inquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry (soft delete)
// @route   DELETE /api/inquiries/:id
// @access  Private
const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status
// @route   PATCH /api/inquiries/:id/status
// @access  Private
const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'Contacted', 'Visit Scheduled', 'Joined', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const inquiry = await Inquiry.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { status },
      { new: true }
    );
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, inquiry });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry,
  updateStatus,
};
