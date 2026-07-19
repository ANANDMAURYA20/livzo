const Settings = require('../models/Settings');

// @desc    Get system settings (options for dropdowns)
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.status(200).json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update system settings
// @route   PUT /api/settings
// @access  Private (Admin)
const updateSettings = async (req, res, next) => {
  try {
    const { branches, sources, propertyTypes, roomTypes, genderOptions, counselors } = req.body;
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    if (branches) settings.branches = branches;
    if (sources) settings.sources = sources;
    if (propertyTypes) settings.propertyTypes = propertyTypes;
    if (roomTypes) settings.roomTypes = roomTypes;
    if (genderOptions) settings.genderOptions = genderOptions;
    if (counselors) settings.counselors = counselors;

    await settings.save();

    res.status(200).json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, updateSettings };
