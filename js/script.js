// Import EmailJS configuration
import config from './email.js';
window.emailConfig = config;

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(window.emailConfig.emailjs.publicKey);
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu when clicking nav links
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                body.style.overflow = '';
            });
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
                    document.body.style.overflow = '';
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
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const statusDiv = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const orig = btn.textContent;
            btn.textContent = 'Sending…';
            btn.disabled = true;

            emailjs.sendForm(
                window.emailConfig.emailjs.serviceID,
                window.emailConfig.emailjs.templateID,
                this
            )
            .then(() => {
                this.reset();
                showToast('Message sent successfully!', 'success');
            })
            .catch(err => {
                console.error('EmailJS error:', err);
                showToast('Failed to send message. Please try again.', 'error');
            })
            .finally(() => {
                btn.textContent = orig;
                btn.disabled = false;
            });
        });

        function showToast(message, type) {
            statusDiv.textContent = message;
            statusDiv.className = `form-status ${type}`;
            statusDiv.style.display = 'block';
            
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 5000);
        }
    }
    
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletterForm');
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
        const elements = document.querySelectorAll('.service-card, .portfolio-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = '1';
                // Keep the original transform if it exists (e.g., for the 3D effect)
                // If element.style.transform is empty or 'none', set translateY(0)
                if (!element.style.transform || element.style.transform === 'none' || element.style.transform.includes('translateY(20px)')) {
                     element.style.transform = 'translateY(0)';
                }
            }
        });
    };
    
    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();

    // 3D Mouse Following Effect for Pricing Cards
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const moveX = (mouseX - cardCenterX) / (cardRect.width / 2);
            const moveY = (mouseY - cardCenterY) / (cardRect.height / 2);

            // Adjust these values for sensitivity and maximum rotation/translation
            const rotateY = moveX * 10; // Max 10 degrees rotation on Y axis
            const rotateX = moveY * -10; // Max 10 degrees rotation on X axis (inverted for natural feel)
            const translateZ = 30; // Move card slightly forward on hover
            const scale = 1.05; // Slightly scale up on hover

            // Apply transform, maintaining translateZ(0) base from CSS if needed
             card.style.transform = `translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

        });

        card.addEventListener('mouseleave', () => {
            // Reset transform when mouse leaves
            // Use translateZ(0) to ensure the 3D context is preserved
            card.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg) scale(1)';
        });

         // Add a slight transition delay on mouseleave for a smoother snap back
         // This is handled by the CSS transition property already added

    });

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            // Remove the preloader from the DOM after the transition
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 600); // Matches the CSS transition duration
        });
    }
});
