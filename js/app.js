/**
 * Not Just a Game - Основной JavaScript файл
 * 2025 год
 */

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('Not Just a Game - игровой портал (2025)');
    
    // Удаляем прелоадер
    initPreloader();
    
    // Инициализация анимаций
    initAnimations();
    
    // Обработка событий
    setupEventListeners();
    
    // Инициализация анимаций прокрутки
    initScrollAnimations();
    
    // Загрузка сохраненной темы
    loadSavedTheme();
});

/**
 * Инициализация прелоадера
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Скрываем прелоадер через 800мс
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Полностью удаляем из DOM после анимации
            setTimeout(() => preloader.remove(), 500);
        }, 800);
    }
}

/**
 * Инициализация анимаций с помощью классов CSS
 */
function initAnimations() {
    // Анимация заголовка на главной
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.hero__title-line');
        titleLines.forEach((line, index) => {
            line.classList.add('animate-fade-in-up');
            line.style.animationDelay = `${index * 200}ms`;
        });
    }
    
    // Анимация карточек игр
    const gameCards = document.querySelectorAll('.game-card');
    if (gameCards.length) {
        gameCards.forEach((card, index) => {
            card.classList.add('animate-fade-in');
            card.style.animationDelay = `${index * 100 + 300}ms`;
        });
    }
    
    // Анимация элементов гайдов
    const guideItems = document.querySelectorAll('.guide-item');
    if (guideItems.length) {
        guideItems.forEach((item, index) => {
            item.classList.add('animate-fade-in-up');
            item.style.animationDelay = `${index * 100 + 500}ms`;
        });
    }
}

/**
 * Установка обработчиков событий
 */
function setupEventListeners() {
    // Обработчик события для переключения темы
    const themeToggle = document.querySelector('.header__theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Анимация при наведении на карточки
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
    
    // Обработчик для навигационных ссылок с плавной прокруткой
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

/**
 * Инициализация анимаций при прокрутке
 */
function initScrollAnimations() {
    // Добавление классов для анимации при прокрутке
    const scrollElements = document.querySelectorAll('.scroll-animate');
    const staggerLists = document.querySelectorAll('.stagger-list');
    
    // Функция проверки видимости элемента
    const isElementInViewport = (el, offset = 100) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset)
        );
    };
    
    // Функция обработки анимации при прокрутке
    const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('in-view');
            }
        });
        
        staggerLists.forEach(list => {
            if (isElementInViewport(list)) {
                list.classList.add('in-view');
            }
        });
    };
    
    // Вызываем функцию сразу и при прокрутке
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
}

/**
 * Переключение между светлой и темной темой
 */
function toggleTheme() {
    const body = document.body;
    const isDarkTheme = body.classList.toggle('dark-theme');
    
    // Сохраняем предпочтение пользователя в localStorage
    localStorage.setItem('darkTheme', isDarkTheme);
    
    // Анимация переключения
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.classList.add('animate-spin');
        setTimeout(() => {
            themeIcon.classList.remove('animate-spin');
        }, 300);
    }
    
    // Обновляем иконку переключателя темы
    updateThemeIcon(isDarkTheme);
}

/**
 * Обновление иконки переключателя темы
 */
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

/**
 * Проверяем, если пользователь уже выбирал темную тему ранее
 */
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