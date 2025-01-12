document.addEventListener('DOMContentLoaded', () => {
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

    if (hero2) {  // Check if hero2 exists before trying to access its properties
      const hero2Top = hero2.getBoundingClientRect().top;
      console.log(hero2Top);  // Check the distance of the 2nd hero section from the top

      if (hero2Top <= 0 && header) {
        header.classList.add('solid'); // Add solid background when past 2nd hero
      } else if (header) {
        header.classList.remove('solid'); // Revert to transparent when above 2nd hero
      }
    }
  });

  // Other service card event listeners
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
    const serviceDetails = event.target.closest('.service-box').querySelector('.service-details');
    const arrow = event.target.closest('.service-box').querySelector('.arrow');

    if (serviceDetails && arrow) {
      serviceDetails.classList.toggle('show'); // Toggle visibility of details
      arrow.innerHTML = arrow.innerHTML === '&#x2191;' ? '&#x2193;' : '&#x2191;'; // Toggle arrow
    }
    if (serviceDetails && arrow) {
      // Toggle visibility and rotate the arrow
      serviceDetails.style.display = (serviceDetails.style.display === 'block' ? 'none' : 'block');
      arrow.style.transform = (arrow.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)');
    }
  }

  // Attach event listeners to each service header
  const serviceHeaders = document.querySelectorAll('.service-header');
  serviceHeaders.forEach(header => {
    header.addEventListener('click', toggleServiceDetails);
  });
});
