const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    branches: {
      type: [String],
      default: [
        'Koramangala',
        'Indiranagar',
        'Whitefield',
        'HSR Layout',
        'Electronic City',
        'Marathahalli',
        'Jayanagar',
        'Rajajinagar',
      ],
    },
    sources: {
      type: [String],
      default: [
        'Website',
        'Walk-in',
        'Referral',
        'Social Media',
        'Phone Call',
        'Email',
        'Advertisement',
        'Other',
      ],
    },
    propertyTypes: {
      type: [String],
      default: ['1BHK', '2BHK', '3BHK', 'Studio', 'PG Room', 'Shared Room'],
    },
    roomTypes: {
      type: [String],
      default: ['Single', 'Double', 'Triple', 'Any'],
    },
    genderOptions: {
      type: [String],
      default: ['Male', 'Female', 'Other'],
    },
    counselors: {
      type: [String],
      default: [
        'Priya Sharma',
        'Rahul Verma',
        'Anita Nair',
        'Kiran Patel',
        'Meera Iyer',
        'Suresh Kumar',
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
