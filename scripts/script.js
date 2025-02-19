console.log("script.js is loaded on", window.location.pathname);

document.addEventListener('DOMContentLoaded', function () {
  // Check if we're on contact.html before initializing EmailJS
  if (window.location.pathname.includes("contact.html")) {
    const emailJsScript = document.createElement("script");
    emailJsScript.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    emailJsScript.onload = function () {
      emailjs.init("t8D-9keC7wl8fcNlm");
      console.log("EmailJS initialized");
    };
    document.body.appendChild(emailJsScript);
  }

  // Smooth page load animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Apply fade-in effect to all sections with the 'fade-in' class
    const fadeInSections = document.querySelectorAll('.fade-in');
    fadeInSections.forEach(section => {
      section.classList.add('visible');
    });
  });

  // Scroll event to add a solid background to the header
  document.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const hero2 = document.getElementById('hero-2');
    
    if (!hero2) {
      console.warn("hero-2 not found on this page.");
      return; // Stop execution if hero-2 isn't present
    }

    const hero2Position = hero2.offsetTop; // Get hero-2's top position relative to the page
    const scrollPosition = window.scrollY; // Current scroll position

    console.log(`hero-2 Position: ${hero2Position}, Scroll Position: ${scrollPosition}`); // Debugging

    if (scrollPosition >= hero2Position && header) {
      header.classList.add('solid'); // Add solid background when past 2nd hero
    } else if (header) {
      header.classList.remove('solid'); // Revert to transparent when above 2nd hero
    }
  });

  // Service card redirection
  const serviceCards = [
    { id: 'audit-&-assurance-services-card', url: 'audit-&-assurance-services.html' },
    { id: 'corporate-finance-&-strategy-card', url: 'corporate-finance-&-strategy.html' },
    { id: 'tax-services-Card', url: 'tax-services.html' },
    { id: 'accounting-&-management-advisory-services-Card', url: 'accounting-&-management-advisory-services.html' },
    { id: 'training-card', url: 'training.html' }
  ];

  serviceCards.forEach(card => {
    const cardElement = document.getElementById(card.id);
    if (cardElement) {
      cardElement.addEventListener('click', () => {
        window.location.href = card.url;
      });
    }
  });

  // Function to toggle the visibility of service details
  function toggleServiceDetails(event) {
    const serviceBox = event.target.closest('.service-box');
    const serviceDetails = serviceBox.querySelector('.service-details');
    const arrow = serviceBox.querySelector('.arrow');

    if (serviceDetails && arrow) {
      // Toggle visibility of details
      serviceDetails.classList.toggle('show'); 

      // Toggle arrow direction
      const isVisible = serviceDetails.classList.contains('show');
      arrow.innerHTML = isVisible ? '&darr;' : '&uarr;'; // Down arrow ↓, Up arrow ↑
    }
  }

  // Attach event listeners to each service header
  const serviceHeaders = document.querySelectorAll('.service-header');
  serviceHeaders.forEach(header => {
    header.addEventListener('click', toggleServiceDetails);
  });

  // EmailJS Contact Form Submission (Only in contact.html)
  if (window.location.pathname.includes("contact.html")) {
    const form = document.getElementById('contact-form'); // Get the form by its ID
    if (form) {  // Check if the form exists
      // Listen for form submission
      form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Send the form data via EmailJS
        emailjs.send('service_46erdlc', 'template_fyvvndg', {
          name: name,
          email: email,
          message: message
        })
        .then(function(response) {
          console.log('Success!', response);
          alert('Your message has been sent successfully!');
          form.reset(); // Clear the form after submission
        })
        .catch(function(error) {
          console.error('Failed...', error);
          alert('Sorry, something went wrong. Please try again later.');
        });
      });
    } else {
      console.error('Form not found!');
    }
  }
});
