require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Inquiry = require('../models/Inquiry');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/visitorflow';

const branches = ['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Electronic City'];
const sources = ['Website', 'Walk-in', 'Referral', 'Social Media', 'Phone Call'];
const statuses = ['New', 'Contacted', 'Visit Scheduled', 'Joined', 'Rejected'];
const counselors = ['Priya Sharma', 'Rahul Verma', 'Anita Nair', 'Kiran Patel'];
const propertyTypes = ['1BHK', '2BHK', 'Studio', 'PG Room', 'Shared Room'];
const genders = ['Male', 'Female'];

const names = [
  'Aarav Mehta', 'Ishaan Kapoor', 'Priya Sharma', 'Divya Nair', 'Arjun Singh',
  'Sneha Patel', 'Rohan Gupta', 'Kavya Reddy', 'Vikram Joshi', 'Pooja Iyer',
  'Manish Kumar', 'Shruti Agarwal', 'Ravi Krishnan', 'Ananya Bose', 'Siddharth Roy',
  'Meera Pillai', 'Ajay Verma', 'Tanvi Shah', 'Nikhil Malhotra', 'Deepika Rao',
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Clean existing data
  await User.deleteMany({});
  await Inquiry.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // Create admin user
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@visitorflow.com',
    password: 'Admin@123',
    role: 'admin',
  });
  console.log('👤 Admin created: admin@visitorflow.com / Admin@123');

  // Create sample inquiries
  const inquiries = names.map((name, i) => {
    const status = randomItem(statuses);
    const createdAt = randomDate(new Date('2024-01-01'), new Date());
    const visitDate =
      status === 'Visit Scheduled'
        ? randomDate(new Date(), new Date(Date.now() + 14 * 24 * 60 * 60 * 1000))
        : status === 'Joined' || status === 'Rejected'
        ? randomDate(new Date('2024-01-01'), new Date())
        : null;

    return {
      name,
      mobile: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
      email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
      gender: randomItem(genders),
      age: Math.floor(18 + Math.random() * 35),
      address: `${Math.floor(10 + Math.random() * 990)}, ${randomItem(branches)}, Bengaluru`,
      branch: randomItem(branches),
      budget: Math.floor(5000 + Math.random() * 25000),
      moveInDate: randomDate(new Date(), new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)),
      visitDate,
      status,
      assignedCounselor: randomItem(counselors),
      source: randomItem(sources),
      propertyType: randomItem(propertyTypes),
      preferredRoom: randomItem(['Single', 'Double', 'Triple', 'Any']),
      notes: i % 3 === 0 ? 'Customer is very interested. Follow up soon.' : '',
      createdAt,
      updatedAt: createdAt,
    };
  });

  await Inquiry.insertMany(inquiries);
  console.log(`📋 Created ${inquiries.length} sample inquiries`);

  console.log('\n✅ Seed complete!');
  console.log('🚀 Login: admin@visitorflow.com | Admin@123\n');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
