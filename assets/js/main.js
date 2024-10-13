document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Element with id "${this.getAttribute('href').slice(1)}" not found`);
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Log form data to console (can be replaced by a server-side request)
            console.log('Form submitted:', { name, email, message });
            
            // Clear the form
            contactForm.reset();
            
            // Show a success message
            alert('Thank you for your message! I will get back to you soon.');
        });
    } else {
        console.warn("Contact form not found");
    }
});