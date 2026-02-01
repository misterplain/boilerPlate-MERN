/**
 * API Configuration
 * Centralized configuration for API endpoints and URLs
 * Automatically uses the correct baseURL based on NODE_ENV
 */

export const getServerURL = () => {
  return process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER_API_URL
    : "http://localhost:5000";
};

export const getClientURL = () => {
  return process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_CLIENT_URL
    : "http://localhost:3000";
};

// For OAuth and redirects that need full URLs
export const SERVER_URL = getServerURL();
export const CLIENT_URL = getClientURL();
