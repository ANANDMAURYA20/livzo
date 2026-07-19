import api from './api';

export const aiService = {
  generateWhatsApp: async (inquiryData) => {
    const res = await api.post('/ai/whatsapp', inquiryData);
    return res.data;
  },
};
