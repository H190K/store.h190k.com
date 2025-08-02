class TermsConditions {
    constructor() {
        this.translations = null;
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.applyLanguage(this.currentLang);
        this.setupEventListeners();
    }

    async loadTranslations() {
        try {
            const response = await fetch('./terms-language.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    applyLanguage(lang) {
        if (!this.translations || !this.translations[lang]) return;
        
        const t = this.translations[lang];
        
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
        
        document.getElementById('terms-title').textContent = t.title;
        document.getElementById('home-text').textContent = t.home_text;
        document.getElementById('copyright').textContent = t.copyright;
        
        const contentContainer = document.getElementById('terms-content');
        contentContainer.innerHTML = t.content.join('');
        
        // Update language dropdown
        const languageDropdown = document.getElementById('languageDropdown');
        if (languageDropdown) languageDropdown.value = lang;
    }

    setupEventListeners() {
        const languageDropdown = document.getElementById('languageDropdown');
        if (languageDropdown) {
            languageDropdown.addEventListener('change', (e) => {
                this.currentLang = e.target.value;
                localStorage.setItem('language', this.currentLang);
                this.applyLanguage(this.currentLang);
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TermsConditions();
});