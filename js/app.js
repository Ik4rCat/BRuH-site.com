// Инициализация GSAP
try {
    gsap.registerPlugin(ScrollTrigger);
} catch (error) {
    console.error('Ошибка инициализации GSAP:', error);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Not Just a Game - игровой портал (2025)');
    
    initPreloader();
    
    initAnimations();
    
    setupEventListeners();
    
    initScrollAnimations();
    
    initSmoothScroll();
});

function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            delay: 1,
            onComplete: () => {
                preloader.classList.add('hidden');
            }
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
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const cards = gsap.utils.toArray('.game-card');
    if (cards.length) {
        cards.forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }
}

function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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