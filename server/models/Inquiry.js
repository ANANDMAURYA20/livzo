const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    gender: {
      type: String,
      default: '',
    },
    age: {
      type: Number,
      min: 0,
      max: 100,
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      trim: true,
    },
    budget: {
      type: Number,
      default: 0,
    },
    moveInDate: {
      type: Date,
    },
    visitDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Visit Scheduled', 'Joined', 'Rejected'],
      default: 'New',
    },
    assignedCounselor: {
      type: String,
      trim: true,
      default: '',
    },
    source: {
      type: String,
      default: '',
    },
    propertyType: {
      type: String,
      trim: true,
      default: '',
    },
    preferredRoom: {
      type: String,
      trim: true,
      default: '',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for search performance
inquirySchema.index({ name: 'text', email: 'text', mobile: 'text' });
inquirySchema.index({ status: 1, branch: 1, createdAt: -1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
