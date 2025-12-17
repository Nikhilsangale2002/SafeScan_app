import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, refresh_token, user } = response.data;
    
    // Store tokens and user data
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.AUTH_TOKEN, access_token],
      [STORAGE_KEYS.REFRESH_TOKEN, refresh_token],
      [STORAGE_KEYS.USER_DATA, JSON.stringify(user)],
    ]);
    
    return response.data;
  },

  // Logout user
  logout: async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER_DATA,
    ]);
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return !!token;
  },
};
