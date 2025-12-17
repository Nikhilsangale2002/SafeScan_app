import api from './api';

export const dashboardService = {
  // Get dashboard statistics
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  // Get timeline data
  getTimeline: async (days = 7) => {
    const response = await api.get('/dashboard/timeline', { params: { days } });
    return response.data;
  },

  // Get recent threats
  getRecentThreats: async (limit = 10) => {
    const response = await api.get('/dashboard/recent-threats', { params: { limit } });
    return response.data;
  },
};
