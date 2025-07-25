/**
 * API Integration Script for Portfolio Website
 * This script handles fetching data from the Portfolio API and populating the website content.
 * 
 * @author Bruno Paulon
 * @version 1.0.0
 */

(function ($) {
  "use strict";

  /**
   * Generic function to make API requests
   * @param {string} endpoint - The API endpoint to call
   * @param {function} successCallback - Function to call on successful response
   * @param {function} errorCallback - Function to call on error
   */
  function makeApiRequest(endpoint, successCallback, errorCallback) {
    $.ajax({
      url: endpoint,
      method: "GET",
      dataType: "json",
      timeout: 10000, // 10 seconds timeout
      success: successCallback,
      error: errorCallback || function(xhr, status, error) {
        console.error("API request failed:", error);
        console.log("Endpoint:", endpoint);
      }
    });
  }

  /**
   * Load and display profile information
   */
  function loadProfileData() {
    makeApiRequest(window.API_ENDPOINTS.profile, function(data) {
      console.log("Profile data loaded:", data);
      
      // Update profile information in the DOM
      if (data.name) {
        $(".hero-title").text(`Hello there! I'm ${data.name}`);
        $(".navbar-brand").text(data.name);
      }
      
      if (data.title) {
        $(".hero-text h2").text(`I'm a ${data.title}.`);
      }
      
      if (data.bio) {
        $(".about-thumb p").first().text(data.bio);
      }
      
      if (data.email) {
        $("a[href^='mailto:']").attr("href", "mailto:" + data.email).text(data.email);
      }
      
      if (data.phone) {
        $("a[href^='tel:']").attr("href", "tel:" + data.phone).text(data.phone);
      }
      
      if (data.location) {
        $(".profile-body span").filter(function() {
          return $(this).prev().text().includes("Location");
        }).text(data.location);
      }
      
      // Update statistics
      if (data.yearsOfExperience) {
        $(".featured-numbers").eq(0).text(data.yearsOfExperience + "+");
      }
      if (data.projectsCompleted) {
        $(".featured-numbers").eq(1).text(data.projectsCompleted + "+");
      }
      if (data.certifications) {
        $(".featured-numbers").eq(2).text(data.certifications + "+");
      }
      if (data.awards) {
        $(".featured-numbers").eq(3).text(data.awards + "+");
      }
    });
  }

  /**
   * Load and display services
   */
  function loadServicesData() {
    makeApiRequest(window.API_ENDPOINTS.services, function(data) {
      console.log("Services data loaded:", data);
      
      const servicesContainer = $("#services-list");
      
      if (data && data.length > 0) {
        servicesContainer.empty(); // Clear existing content
        
        data.forEach(function(service, index) {
          const serviceHtml = `
            <div class="col-lg-6 col-12">
              <div class="services-thumb ${index % 2 === 1 ? 'services-thumb-up' : ''}">
                <div class="d-flex flex-wrap align-items-center border-bottom mb-4 pb-3">
                  <h3 class="mb-0">${service.title}</h3>
                  <div class="services-price-wrap ms-auto">
                    <p class="services-price-text mb-0">${service.price || 'Custom Quote'}</p>
                    <div class="services-price-overlay"></div>
                  </div>
                </div>
                <p>${service.description}</p>
                <a href="${service.link || '#'}" class="custom-btn custom-border-btn btn mt-3">Learn More</a>
                <div class="services-icon-wrap d-flex justify-content-center align-items-center">
                  <i class="services-icon ${service.icon || 'bi-gear'}"></i>
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
    makeApiRequest(window.API_ENDPOINTS.projects, function(data) {
      console.log("Projects data loaded:", data);
      
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
    makeApiRequest(window.API_ENDPOINTS.technologies, function(data) {
      console.log("Technologies data loaded:", data);
      
      const technologiesContainer = $("#technologies-list");
      
      if (data && data.length > 0) {
        technologiesContainer.empty(); // Clear existing content
        
        data.forEach(function(tech) {
          const techHtml = `
            <div class="col-lg-2 col-4 clients-item-height">
              <img src="${tech.logo}" class="clients-image img-fluid" alt="${tech.name}" title="${tech.name}">
            </div>
          `;
          technologiesContainer.append(techHtml);
        });
      }
    });
  }

  /**
   * Handle contact form submission
   */
  function setupContactForm() {
    const contactForm = $("#contact-form");
    
    if (contactForm.length > 0) {
      contactForm.on("submit", function(e) {
        e.preventDefault();
        
        const formData = {
          name: $("#contact-name").val(),
          email: $("#contact-email").val(),
          subject: $("#contact-subject").val(),
          message: $("#contact-message").val()
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
          alert("Please fill in all fields.");
          return;
        }
        
        // Submit to API
        $.ajax({
          url: window.API_ENDPOINTS.contact,
          method: "POST",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(formData),
          success: function(response) {
            alert("Message sent successfully!");
            contactForm[0].reset();
          },
          error: function(xhr, status, error) {
            console.error("Contact form submission failed:", error);
            alert("Failed to send message. Please try again later.");
          }
        });
      });
    }
  }

  /**
   * Initialize all API data loading
   */
  function initializeApiIntegration() {
    // Check if API endpoints are available
    if (typeof window.API_ENDPOINTS === 'undefined') {
      console.warn("API endpoints not configured. Skipping API integration.");
      return;
    }
    
    console.log("Initializing API integration...");
    
    // Load data from API
    loadProfileData();
    loadServicesData();
    loadProjectsData();
    loadTechnologiesData();
    
    // Setup contact form
    setupContactForm();
  }

  // Initialize when document is ready
  $(document).ready(function() {
    // Add a small delay to ensure all scripts are loaded
    setTimeout(initializeApiIntegration, 500);
  });

})(window.jQuery);

