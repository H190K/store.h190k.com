// Language and Theme Management
class LanguageThemeManager {
    constructor() {
        this.translations = null;
        this.currentLang = localStorage.getItem('language') || 'en';
        this.currentTheme = localStorage.getItem('theme') || 'dark'; // Dark theme as default
        this.init();
    }

    async init() {
        // Load translations
        await this.loadTranslations();
        
        // Apply saved preferences
        this.applyLanguage(this.currentLang);
        this.applyTheme(this.currentTheme);
        
        // Set up event listeners
        this.setupEventListeners();
    }

    async loadTranslations() {
        try {
            const response = await fetch('./translations.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    setupEventListeners() {
        // Language dropdown
        const languageDropdown = document.getElementById('languageDropdown');
        if (languageDropdown) {
            languageDropdown.value = this.currentLang;
            languageDropdown.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }

        // Theme switcher
        const themeButton = document.getElementById('themeToggle');
        if (themeButton) {
            themeButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    changeLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.applyLanguage(lang);
        
        // Add animation effect
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 600);
        // Dispatch a custom event for language change
        window.dispatchEvent(new Event('languageChanged'));
        // Explicitly dispatch a storage event to ensure portfolio updates
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'language',
            newValue: lang
        }));
    }

    applyLanguage(lang) {
        if (!this.translations || !this.translations[lang]) return;

        const t = this.translations[lang];
        
        // Update HTML direction
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);

        // Update header
        const logo = document.querySelector('.logo a');
        if (logo) logo.textContent = t.header.brand;

        // Update navigation
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach((link, index) => {
            const keys = ['services', 'pricing', 'portfolio', 'contact'];
            if (t.header.nav[keys[index]]) {
                link.textContent = t.header.nav[keys[index]];
            }
        });

        // Update footer quick links
        const footerLinks = document.querySelectorAll('.footer-links ul li a');
        footerLinks.forEach((link, index) => {
            const keys = ['services', 'pricing', 'portfolio', 'contact'];
            if (t.header.nav[keys[index]]) {
                link.textContent = t.header.nav[keys[index]];
            }
        });

        // Update hero section
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) heroTitle.textContent = t.hero.title;
        
        const heroSubtitle = document.querySelector('.hero-content p');
        if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
        
        const heroCta = document.querySelector('.hero-btn');
        if (heroCta) heroCta.textContent = t.hero.cta;

        // Update services section
        const servicesTitle = document.querySelector('#services .section-header h2');
        if (servicesTitle) servicesTitle.textContent = t.services.title;
        
        const servicesSubtitle = document.querySelector('#services .section-header p');
        if (servicesSubtitle) servicesSubtitle.textContent = t.services.subtitle;

        // Update service cards
        const serviceCards = document.querySelectorAll('.service-card');
        const serviceKeys = ['landingPage', 'dashboard', 'tools', 'dns', 'fullstack', 'custom'];
        
        serviceCards.forEach((card, index) => {
            if (serviceKeys[index] && t.services.items[serviceKeys[index]]) {
                const service = t.services.items[serviceKeys[index]];
                const title = card.querySelector('h3');
                const desc = card.querySelector('p');
                const link = card.querySelector('.service-link');
                
                if (title) title.textContent = service.title;
                if (desc) desc.textContent = service.description;
                if (link) link.textContent = t.services.learnMore;
            }
        });

        // Update pricing section
        const pricingTitle = document.querySelector('#pricing .section-header h2');
        if (pricingTitle) pricingTitle.textContent = t.pricing.title;
        
        const pricingSubtitle = document.querySelector('#pricing .section-header p');
        if (pricingSubtitle) pricingSubtitle.textContent = t.pricing.subtitle;

        // Update pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card');
        // Map service keys for card titles and payment types
        const serviceKeysForPricing = ['landingPage', 'dashboard', 'tools', 'dns', 'fullstack', 'custom'];
        const paymentKeys = ['oneTime', 'oneTime', 'oneTime', 'monthly', 'oneTime', 'custom'];
        const featureKeysByCard = {
            0: ['customDesign', 'mobileResponsive', 'seoOptimization', 'contactForm', 'revisions'],
            1: ['userInterface', 'dataVisualization', 'interactiveElements', 'userAuth', 'revisions'],
            2: ['customAutomation', 'workflowOptimization', 'integrationCapabilities', 'userDocumentation', 'revisions'],
            3: ['domainRegistration', 'dnsConfiguration', 'sslCertificate', 'emailSetup', 'monitoring'],
            4: ['frontendDev', 'backendIntegration', 'databaseSetup', 'customDesign', 'revisions'],
            5: ['personalizedSolutions', 'customFeatures', 'flexibleTimeline', 'dedicatedSupport', 'scalableOptions']
        };
        pricingCards.forEach((card, index) => {
            // Title
            const cardTitle = card.querySelector('.pricing-header h3');
            if (cardTitle && t.services.items[serviceKeysForPricing[index]]) {
                cardTitle.textContent = t.services.items[serviceKeysForPricing[index]].title;
            }
            // Payment descriptor
            const paymentTextEl = card.querySelector('.pricing-header p');
            if (paymentTextEl && t.pricing[paymentKeys[index]]) {
                paymentTextEl.textContent = t.pricing[paymentKeys[index]];
            }
            // Features list
            const featureLis = card.querySelectorAll('.pricing-features ul li');
            if (t.pricing.features) {
                featureLis.forEach((li, liIndex) => {
                    const key = featureKeysByCard[index][liIndex];
                    if (key && t.pricing.features[key]) {
                        li.textContent = t.pricing.features[key];
                    }
                });
            }
            // Button
            const btn = card.querySelector('.btn');
            if (btn) {
                if (card.classList.contains('custom')) {
                    btn.textContent = t.pricing.contactUs;
                } else {
                    btn.textContent = t.pricing.getStarted;
                }
            }
        });

        // Update portfolio section
        const portfolioTitle = document.querySelector('#portfolio .section-header h2');
        if (portfolioTitle) portfolioTitle.textContent = t.portfolio.title;
        
        const portfolioSubtitle = document.querySelector('#portfolio .section-header p');
        if (portfolioSubtitle) portfolioSubtitle.textContent = t.portfolio.subtitle;

        const viewAllBtn = document.querySelector('.view-all-btn');
        if (viewAllBtn) viewAllBtn.textContent = t.portfolio.viewAll;

        // Update contact section
        const contactTitle = document.querySelector('#contact .section-header h2');
        if (contactTitle) contactTitle.textContent = t.contact.title;
        
        const contactSubtitle = document.querySelector('#contact .section-header p');
        if (contactSubtitle) contactSubtitle.textContent = t.contact.subtitle;

        // Update form placeholders
        const nameInput = document.getElementById('name');
        if (nameInput) nameInput.placeholder = t.contact.form.name;
        
        const emailInput = document.getElementById('email');
        if (emailInput) emailInput.placeholder = t.contact.form.email;
        
        const serviceSelect = document.getElementById('service');
        if (serviceSelect && serviceSelect.options[0]) {
            serviceSelect.options[0].textContent = t.contact.form.selectService;
        }
        
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) messageTextarea.placeholder = t.contact.form.message;
        
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        if (submitBtn) submitBtn.textContent = t.contact.form.send;

        // Update social section
        const socialTitle = document.querySelector('.social-container h3');
        if (socialTitle) socialTitle.textContent = t.contact.social.title;
        
        const emailText = document.querySelector('.email-contact');
        if (emailText && t.contact.social.emailText) {
            const emailLink = emailText.querySelector('a');
            const emailHref = emailLink ? emailLink.href : '';
            emailText.innerHTML = `${t.contact.social.emailText} <a href="${emailHref}">info@h190k.com</a>`;
        }

        // Update footer
        const footerTagline = document.querySelector('.footer-logo p');
        if (footerTagline) footerTagline.textContent = t.footer.tagline;
        
        const quickLinksTitle = document.querySelector('.footer-links h3');
        if (quickLinksTitle) quickLinksTitle.textContent = t.footer.quickLinks;
        
        const newsletterTitle = document.querySelector('.footer-newsletter h3');
        if (newsletterTitle) newsletterTitle.textContent = t.footer.newsletter.title;
        
        const newsletterSubtitle = document.querySelector('.footer-newsletter p');
        if (newsletterSubtitle) newsletterSubtitle.textContent = t.footer.newsletter.subtitle;
        
        const newsletterInput = document.querySelector('.footer-newsletter input');
        if (newsletterInput) newsletterInput.placeholder = t.footer.newsletter.placeholder;
        
        const newsletterBtn = document.querySelector('.footer-newsletter .btn');
        if (newsletterBtn) newsletterBtn.textContent = t.footer.newsletter.button;
        
        const copyright = document.querySelector('.footer-bottom p');
        if (copyright) copyright.textContent = t.footer.copyright;
        
        const langLabel = document.querySelector('.language-selector label');
        if (langLabel) langLabel.textContent = t.footer.language;
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme(this.currentTheme);
        
        // Add animation effect
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 600);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme button icon (sun for dark mode, moon for light mode)
        const themeButton = document.getElementById('themeToggle');
        if (themeButton) {
            const icon = themeButton.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun'; // Sun icon in dark mode
                } else {
                    icon.className = 'fas fa-moon'; // Moon icon in light mode
                }
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LanguageThemeManager();
}); 