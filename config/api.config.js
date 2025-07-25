/**
 * API Configuration File
 * This file contains all the configuration settings for API integration.
 * 
 * @author Bruno Paulon
 * @version 1.0.0
 */

const API_CONFIG = {
  // Base URL for the API - update this when the API is deployed
  baseUrl: process.env.API_BASE_URL || "https://api.brunopaulon.dev",
  
  // API version
  version: "v1",
  
  // Timeout for API requests (in milliseconds)
  timeout: 10000,
  
  // API endpoints
  endpoints: {
    profile: "/profile",
    services: "/services",
    projects: "/projects",
    technologies: "/technologies",
    contact: "/contact",
    testimonials: "/testimonials"
  },
  
  // Headers for API requests
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  
  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000 // milliseconds
  },
  
  // Cache configuration
  cache: {
    enabled: true,
    duration: 300000 // 5 minutes in milliseconds
  }
};

// Export for Node.js environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = API_CONFIG;
}

// Make available globally for browser environments
if (typeof window !== "undefined") {
  window.API_CONFIG = API_CONFIG;
}

