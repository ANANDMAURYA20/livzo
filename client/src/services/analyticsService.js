import api from './api';

export const analyticsService = {
  getOverview: async () => {
    const res = await api.get('/analytics/overview');
    return res.data;
  },
  getMonthly: async () => {
    const res = await api.get('/analytics/monthly');
    return res.data;
  },
  getStatusBreakdown: async () => {
    const res = await api.get('/analytics/status-breakdown');
    return res.data;
  },
  getBranchPerformance: async () => {
    const res = await api.get('/analytics/branch-performance');
    return res.data;
  },
  getUpcomingVisits: async () => {
    const res = await api.get('/analytics/upcoming-visits');
    return res.data;
  },
};
