// Import EmailJS configuration
import config from './email.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's not just "#"
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get the header height for offset
                    const headerHeight = document.querySelector('header').offsetHeight;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Initialize EmailJS
    const initEmailJS = () => {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(config.emailjs.publicKey);
        } else {
            console.error('EmailJS library not loaded');
        }
    };
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        // Initialize EmailJS when the page loads
        initEmailJS();
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !service || !message) {
                showFormStatus('Please fill in all fields', false);
                resetSubmitButton();
                return;
            }
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                service_requested: service,
                message: message
            };
            
            // Send email using EmailJS
            emailjs.send(config.emailjs.serviceID, config.emailjs.templateID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showFormStatus('Thank you for your message! We will get back to you soon.', true);
                    contactForm.reset();
                    resetSubmitButton();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showFormStatus('Oops! Something went wrong. Please try again later.', false);
                    resetSubmitButton();
                });
                
            // Function to reset submit button
            function resetSubmitButton() {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
            
            // Function to show form status
            function showFormStatus(message, isSuccess) {
                formStatus.textContent = message;
                formStatus.className = 'form-status ' + (isSuccess ? 'success' : 'error');
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                    }, 300);
                }, 5000);
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (!email) {
                alert('Please enter your email');
                return;
            }
            
            // Here you would normally send the data to a server
            // For now, we'll just show a success message
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .pricing-card, .portfolio-item, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.service-card, .pricing-card, .portfolio-item, .contact-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
});
