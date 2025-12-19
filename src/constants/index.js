// API Configuration
export const API_URL = __DEV__ 
  ? 'http://localhost:5000/api' 
  : 'https://api.safescan.com/api';

export const MONITORING_URL = __DEV__
  ? 'http://localhost:5003'
  : 'https://monitoring.safescan.com';

// App Configuration
export const APP_NAME = 'SafeScan AI';
export const APP_VERSION = '1.0.0';

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@safescan_auth_token',
  REFRESH_TOKEN: '@safescan_refresh_token',
  USER_DATA: '@safescan_user_data',
};

// Threat Levels
export const THREAT_LEVELS = {
  SAFE: 'safe',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

// Colors
export const COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  light: '#f8fafc',
  dark: '#0f172a',
};

// Email Status
export const EMAIL_STATUS = {
  INBOX: 'inbox',
  QUARANTINE: 'quarantine',
  DELETED: 'deleted',
};
