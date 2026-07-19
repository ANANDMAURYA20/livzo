import { STATUS_CONFIG } from './constants';

export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateInput = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatMobile = (mobile) => {
  if (!mobile) return '—';
  return mobile;
};

export const getStatusBadgeClass = (status) => {
  return STATUS_CONFIG[status]?.className || 'badge';
};

export const getStatusColor = (status) => {
  return STATUS_CONFIG[status]?.color || '#6b7280';
};

export const truncate = (str, len = 30) => {
  if (!str) return '—';
  return str.length > len ? str.slice(0, len) + '…' : str;
};

export const timeAgo = (date) => {
  if (!date) return '—';
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};
