// Управление темой
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Проверяем сохраненную тему
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
}

// Переключение темы
themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Анимация появления элементов при скролле
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Добавляем анимацию для всех карточек и заголовков
document.querySelectorAll('.card, .section__title').forEach(element => {
    observer.observe(element);
});

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация шапки при скролле
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('header--hidden');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('header--hidden')) {
        // Скролл вниз
        header.classList.add('header--hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('header--hidden')) {
        // Скролл вверх
        header.classList.remove('header--hidden');
    }
    
    lastScroll = currentScroll;
});

// Фильтрация гайдов
const guidesFilter = document.querySelector('.guides-filter');
const guidesGrid = document.querySelector('.guides-grid');

if (guidesFilter && guidesGrid) {
    const filterButtons = guidesFilter.querySelectorAll('.guides-filter__button');
    const guides = guidesGrid.querySelectorAll('.guide-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');

            const filter = button.dataset.filter;

            guides.forEach(guide => {
                if (filter === 'all' || guide.dataset.category === filter) {
                    guide.style.display = 'block';
                } else {
                    guide.style.display = 'none';
                }
            });
        });
    });
} 