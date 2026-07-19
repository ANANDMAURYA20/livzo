import api from './api';

export const inquiryService = {
  create: async (data) => {
    const res = await api.post('/inquiries', data);
    return res.data;
  },
  getAll: async (params) => {
    const res = await api.get('/inquiries', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/inquiries/${id}`);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/inquiries/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/inquiries/${id}`);
    return res.data;
  },
  updateStatus: async (id, status) => {
    const res = await api.patch(`/inquiries/${id}/status`, { status });
    return res.data;
  },
};
