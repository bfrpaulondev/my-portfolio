/**
 * @file api.config.js
 * @description Configuration for the API endpoints.
 * This file centralizes API URLs for easy management.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const API_BASE_URL = "https://portfolio-5r4pwizla-bfrpaulondevs-projects.vercel.app/api"; // Replace with your deployed API URL

window.API_ENDPOINTS = {
  profile: `${API_BASE_URL}/profile`,
  services: `${API_BASE_URL}/services`,
  projects: `${API_BASE_URL}/projects`,
  technologies: `${API_BASE_URL}/technologies`,
  contact: `${API_BASE_URL}/contact`,
};


