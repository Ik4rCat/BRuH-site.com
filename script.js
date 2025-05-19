// Мобильное меню
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Переключение навигации
    nav.classList.toggle('active');
    
    // Анимация ссылок
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Анимация бургера
    burger.classList.toggle('toggle');
});

// Данные для игр
const games = [
    {
        title: 'Cyberpunk 2077',
        image: 'images/cyberpunk.jpg',
        description: 'Ночной город будущего, где технологии и человечность сталкиваются в эпической саге о выживании и поиске себя.',
        genre: 'RPG'
    },
    {
        title: 'Elden Ring',
        image: 'images/elden-ring.jpg',
        description: 'Эпическое путешествие по миру, созданному Хидэтакой Миядзаки и Джорджем Р.Р. Мартином.',
        genre: 'Action RPG'
    },
    {
        title: 'God of War Ragnarök',
        image: 'images/god-of-war.jpg',
        description: 'Захватывающая история о семье, судьбе и неизбежности перемен в мире скандинавской мифологии.',
        genre: 'Action Adventure'
    }
];

// Данные для гайдов
const guides = [
    {
        title: 'Философия Cyberpunk 2077',
        image: 'images/cyberpunk-guide.jpg',
        description: 'Исследование тем трансгуманизма, корпоративного контроля и человечности в мире будущего'
    },
    {
        title: 'Мифология Elden Ring',
        image: 'images/elden-guide.jpg',
        description: 'Погружение в богатый мир лора и мифологии игры'
    },
    {
        title: 'Психология God of War',
        image: 'images/gow-guide.jpg',
        description: 'Анализ развития персонажей и их эмоционального пути'
    }
];

// Функция для создания карточек игр
function createGameCards() {
    const gamesGrid = document.querySelector('.games-grid');
    
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <span class="genre">${game.genre}</span>
        `;
        gamesGrid.appendChild(card);
    });
}

// Функция для создания карточек гайдов
function createGuideCards() {
    const guidesGrid = document.querySelector('.guides-grid');
    
    guides.forEach(guide => {
        const card = document.createElement('div');
        card.className = 'guide-card';
        card.innerHTML = `
            <img src="${guide.image}" alt="${guide.title}">
            <h3>${guide.title}</h3>
            <p>${guide.description}</p>
            <a href="#" class="read-more">Читать</a>
        `;
        guidesGrid.appendChild(card);
    });
}

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.game-card, .guide-card').forEach(el => {
    observer.observe(el);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    createGameCards();
    createGuideCards();
}); 