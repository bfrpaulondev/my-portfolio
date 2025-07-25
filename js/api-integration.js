/**
 * API Integration Script for Portfolio Website
 * This script will handle fetching data from external APIs and populating the website content.
 * 
 * @author Bruno Paulon
 * @version 1.0.0
 */

(function ($) {
  "use strict";

  // Ensure API_CONFIG is loaded from api.config.js
  const API_CONFIG = window.API_CONFIG || {};

  /**
   * Generic function to make API requests
   * @param {string} endpoint - The API endpoint to call
   * @param {function} successCallback - Function to call on successful response
   * @param {function} errorCallback - Function to call on error
   */
  function makeApiRequest(endpoint, successCallback, errorCallback) {
    $.ajax({
      url: API_CONFIG.baseUrl + API_CONFIG.version + endpoint,
      method: "GET",
      dataType: "json",
      headers: API_CONFIG.headers,
      timeout: API_CONFIG.timeout,
      success: successCallback,
      error: errorCallback || function(xhr, status, error) {
        console.error("API request failed:", error);
      }
    });
  }

  /**
   * Load and display profile information
   */
  function loadProfileData() {
    makeApiRequest(API_CONFIG.endpoints.profile, function(data) {
      // Update profile information in the DOM
      if (data.name) {
        $(".profile-body span:contains(\'Bruno Paulon\')").text(data.name);
      }
      if (data.email) {
        $("a[href^=\'mailto:\']").attr("href", "mailto:" + data.email).text(data.email);
      }
      if (data.phone) {
        $("a[href^=\'tel:\']").attr("href", "tel:" + data.phone).text(data.phone);
      }
      if (data.location) {
        $(".profile-body span:contains(\'Setúbal, Portugal\')").text(data.location);
      }
    });
  }

  /**
   * Load and display services
   */
  function loadServicesData() {
    makeApiRequest(API_CONFIG.endpoints.services, function(data) {
      const servicesContainer = $("#services-list");
      
      if (data && data.length > 0) {
        servicesContainer.empty(); // Clear existing content
        
        data.forEach(function(service, index) {
          const serviceHtml = `
            <div class="col-lg-6 col-12">
              <div class="services-thumb ${index % 2 === 1 ? \'services-thumb-up\' : \'\'}">
                <div class="d-flex flex-wrap align-items-center border-bottom mb-4 pb-3">
                  <h3 class="mb-0">${service.title}</h3>
                  <div class="services-price-wrap ms-auto">
                    <p class="services-price-text mb-0">${service.price || \'Custom Quote\'}</p>
                    <div class="services-price-overlay"></div>
                  </div>
                </div>
                <p>${service.description}</p>
                <a href="${service.link || \'#\'}" class="custom-btn custom-border-btn btn mt-3">Learn More</a>
                <div class="services-icon-wrap d-flex justify-content-center align-items-center">
                  <i class="services-icon ${service.icon || \'bi-gear\'}"></i>
                </div>
              </div>
            </div>
          `;
          servicesContainer.append(serviceHtml);
        });
      }
    });
  }

  /**
   * Load and display projects
   */
  function loadProjectsData() {
    makeApiRequest(API_CONFIG.endpoints.projects, function(data) {
      const projectsContainer = $("#projects-list");
      
      if (data && data.length > 0) {
        projectsContainer.empty(); // Clear existing content
        
        data.forEach(function(project) {
          const projectHtml = `
            <div class="col-lg-4 col-md-6 col-12">
              <div class="projects-thumb">
                <div class="projects-info">
                  <small class="projects-tag">${project.category}</small>
                  <h3 class="projects-title">${project.title}</h3>
                </div>
                <a href="${project.image}" class="popup-image">
                  <img src="${project.image}" class="projects-image img-fluid" alt="${project.title}">
                </a>
              </div>
            </div>
          `;
          projectsContainer.append(projectHtml);
        });
        
        // Reinitialize magnific popup for new content
        if ($.fn.magnificPopup) {
          $(".popup-image").magnificPopup({
            type: "image",
            gallery: {
              enabled: true
            }
          });
        }
      }
    });
  }

  /**
   * Load and display technologies
   */
  function loadTechnologiesData() {
    makeApiRequest(API_CONFIG.endpoints.technologies, function(data) {
      const technologiesContainer = $("#technologies-list");
      
      if (data && data.length > 0) {
        technologiesContainer.empty(); // Clear existing content
        
        data.forEach(function(tech) {
          const techHtml = `
            <div class="col-lg-2 col-4 clients-item-height">
              <img src="${tech.logo}" class="clients-image img-fluid" alt="${tech.name}">
            </div>
          `;
          technologiesContainer.append(techHtml);
        });
      }
    });
  }

  /**
   * Initialize all API data loading
   */
  function initializeApiIntegration() {
    // Only load API data if we\'re not in development mode
    // You can set a flag or check the hostname to determine this
    if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      loadProfileData();
      loadServicesData();
      loadProjectsData();
      loadTechnologiesData();
    } else {
      console.log("Development mode: API integration disabled");
    }
  }

  // Initialize when document is ready
  $(document).ready(function() {
    initializeApiIntegration();
  });

})(window.jQuery);

