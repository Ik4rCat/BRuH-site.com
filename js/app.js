document.addEventListener('DOMContentLoaded', function() {
    console.log('Not Just a Game - игровой портал (2025)');
    
    initPreloader();
    
    initAnimations();
    
    setupEventListeners();
    
    initScrollAnimations();
    
    loadSavedTheme();
    
    initSmoothScroll();
});

function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('preloader--hidden');
            
            setTimeout(function() {
                preloader.remove();
            }, 300);
        });
    }
}

function initAnimations() {
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.hero__title-line');
        titleLines.forEach((line, index) => {
            line.classList.add('animate-fade-in-up');
            line.style.animationDelay = `${index * 200}ms`;
        });
    }
    
    const gameCards = document.querySelectorAll('.game-card');
    if (gameCards.length) {
        gameCards.forEach((card, index) => {
            card.classList.add('animate-fade-in');
            card.style.animationDelay = `${index * 100 + 300}ms`;
        });
    }
    
    const guideItems = document.querySelectorAll('.guide-item');
    if (guideItems.length) {
        guideItems.forEach((item, index) => {
            item.classList.add('animate-fade-in-up');
            item.style.animationDelay = `${index * 100 + 500}ms`;
        });
    }
}

function setupEventListeners() {
    const themeToggle = document.querySelector('.header__theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    const cards = document.querySelectorAll('.game-card, .guide-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * 0.8 && 
            rect.bottom >= 0
        );
    }
    
    function animateOnScroll() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function toggleTheme() {
    const body = document.body;
    const isDarkTheme = body.classList.toggle('dark-theme');
    
    localStorage.setItem('darkTheme', isDarkTheme);
    
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.classList.add('animate-spin');
        setTimeout(() => {
            themeIcon.classList.remove('animate-spin');
        }, 300);
    }
    
    updateThemeIcon(isDarkTheme);
}

function updateThemeIcon(isDarkTheme) {
    const themeToggle = document.querySelector('.header__theme-toggle');
    if (themeToggle) {
        const sunPath = themeToggle.querySelector('.sun');
        const moonPath = themeToggle.querySelector('.moon');
        
        if (sunPath && moonPath) {
            if (isDarkTheme) {
                sunPath.style.display = 'none';
                moonPath.style.display = 'block';
            } else {
                sunPath.style.display = 'block';
                moonPath.style.display = 'none';
            }
        }
    }
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('darkTheme');
    
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
        updateThemeIcon(true);
    } else {
        document.body.classList.remove('dark-theme');
        updateThemeIcon(false);
    }
} 