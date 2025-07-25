/**
 * Custom JavaScript for the First Portfolio Template.
 * This script handles preloader functionality and smooth scrolling for navigation links.
 */

(function ($) {
  "use strict";

  // Preloader functionality
  // Fades out the preloader element after the window has fully loaded.
  $(window).on("load", function(){
    $(".preloader").fadeOut(1000); // Set duration in milliseconds
  });

  // Smooth scrolling for custom links
  // When a custom link is clicked, it smoothly scrolls to the target section.
  $(".custom-link").on("click", function(event){
    event.preventDefault(); // Prevent default anchor click behavior

    var targetElement = $(this).attr("href"); // Get the target element's ID from the href attribute
    var $targetElementWrapped = $(targetElement);
    var headerHeight = $(".navbar").outerHeight(); // Get the height of the fixed header/navbar

    // Ensure the target element exists before attempting to scroll
    if ($targetElementWrapped.length) {
      // Calculate the total scroll distance, accounting for the header height
      var totalScroll = $targetElementWrapped.offset().top - headerHeight;

      // Animate the scroll to the target position
      $("html, body").animate({
        scrollTop: totalScroll
      }, 300); // Scroll duration in milliseconds
    }
  });

})(window.jQuery);


