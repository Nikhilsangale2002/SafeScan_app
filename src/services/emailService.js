import api from './api';

export const emailService = {
  // Scan email
  scanEmail: async (emailData) => {
    const response = await api.post('/emails/', emailData);
    return response.data;
  },

  // Get all emails
  getEmails: async (params = {}) => {
    const response = await api.get('/emails/', { params });
    return response.data;
  },

  // Get email by ID
  getEmailById: async (id) => {
    const response = await api.get(`/emails/${id}`);
    return response.data;
  },

  // Quarantine email
  quarantineEmail: async (id) => {
    const response = await api.post(`/emails/${id}/quarantine`);
    return response.data;
  },

  // Release email from quarantine
  releaseEmail: async (id) => {
    const response = await api.post(`/emails/${id}/release`);
    return response.data;
  },

  // Delete email
  deleteEmail: async (id) => {
    const response = await api.delete(`/emails/${id}`);
    return response.data;
  },
};
