// Status system
export const STATUSES = ['New', 'Contacted', 'Visit Scheduled', 'Joined', 'Rejected'];

export const STATUS_CONFIG = {
  New: { label: 'New', className: 'badge-new', color: '#60A5FA' },
  Contacted: { label: 'Contacted', className: 'badge-contacted', color: '#f59e0b' },
  'Visit Scheduled': { label: 'Visit Scheduled', className: 'badge-visit', color: '#a855f7' },
  Joined: { label: 'Joined', className: 'badge-joined', color: '#22c55e' },
  Rejected: { label: 'Rejected', className: 'badge-rejected', color: '#ef4444' },
};

export const DEFAULT_BRANCHES = [
  'Koramangala',
  'Indiranagar',
  'Whitefield',
  'HSR Layout',
  'Electronic City',
  'Marathahalli',
  'Jayanagar',
  'Rajajinagar',
];

export const DEFAULT_SOURCES = [
  'Website',
  'Walk-in',
  'Referral',
  'Social Media',
  'Phone Call',
  'Email',
  'Advertisement',
  'Other',
];

export const DEFAULT_PROPERTY_TYPES = ['1BHK', '2BHK', '3BHK', 'Studio', 'PG Room', 'Shared Room'];

export const DEFAULT_ROOM_TYPES = ['Single', 'Double', 'Triple', 'Any'];

export const DEFAULT_GENDER_OPTIONS = ['Male', 'Female', 'Other'];

export const DEFAULT_COUNSELORS = [
  'Priya Sharma',
  'Rahul Verma',
  'Anita Nair',
  'Kiran Patel',
  'Meera Iyer',
  'Suresh Kumar',
];

export const CHART_COLORS = {
  New: '#60A5FA',
  Contacted: '#f59e0b',
  'Visit Scheduled': '#a855f7',
  Joined: '#22c55e',
  Rejected: '#ef4444',
};
