/**
 * Not Just a Game - Управление темой
 * 2025 год
 */

// Ключ для хранения настроек темы в localStorage
const THEME_STORAGE_KEY = 'notJustAGame_theme';

// Возможные темы
const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
};

// Текущая тема
let currentTheme = THEMES.SYSTEM;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем сохраненную тему
    loadSavedTheme();
    
    // Инициализируем обработчики событий
    initThemeHandlers();
});

/**
 * Загрузка сохраненной темы или использование системных предпочтений
 */
function loadSavedTheme() {
    // Проверяем сохраненные настройки
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    // Применяем тему
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    } else if (savedTheme === 'false') {
        document.body.classList.remove('dark-theme');
    } else {
        // Если нет сохраненных настроек, используем системные предпочтения
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
        }
    }
    
    // Обновляем иконку переключателя темы
    updateThemeToggleIcon(document.body.classList.contains('dark-theme'));
    
    // Изменяем мета-тег theme-color для мобильных браузеров
    updateMetaThemeColor(document.body.classList.contains('dark-theme'));
}

/**
 * Применение выбранной темы
 * @param {string} theme - Тема для применения
 */
function applyTheme(theme) {
    const body = document.body;
    const isDarkMode = theme === THEMES.DARK || 
                      (theme === THEMES.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Применяем или убираем класс темной темы
    if (isDarkMode) {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
    
    // Обновляем иконку переключателя темы
    updateThemeToggleIcon(isDarkMode);
    
    // Изменяем мета-тег theme-color для мобильных браузеров
    updateMetaThemeColor(isDarkMode);
}

/**
 * Обновление иконки переключателя темы
 * @param {boolean} isDarkMode - Включен ли темный режим
 */
function updateThemeToggleIcon(isDarkMode) {
    const themeToggle = document.querySelector('.header__theme-toggle');
    if (themeToggle) {
        const sunPath = themeToggle.querySelector('.sun');
        const moonPath = themeToggle.querySelector('.moon');
        
        if (sunPath && moonPath) {
            if (isDarkMode) {
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
 * Обновление мета-тега theme-color для мобильных браузеров
 * @param {boolean} isDarkMode - Включен ли темный режим
 */
function updateMetaThemeColor(isDarkMode) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    // Устанавливаем цвет в зависимости от темы
    metaThemeColor.content = isDarkMode ? '#121212' : '#ffffff';
}

/**
 * Переключение темы при клике на кнопку
 */
function toggleTheme() {
    const body = document.body;
    const isDarkTheme = body.classList.toggle('dark-theme');
    
    // Сохраняем предпочтение пользователя в localStorage
    localStorage.setItem(THEME_STORAGE_KEY, isDarkTheme);
    
    // Обновляем иконку переключателя темы
    updateThemeToggleIcon(isDarkTheme);
    
    // Изменяем мета-тег theme-color для мобильных браузеров
    updateMetaThemeColor(isDarkTheme);
    
    // Добавляем анимацию
    animateThemeToggle();
}

/**
 * Анимация при переключении темы
 */
function animateThemeToggle() {
    const themeToggle = document.querySelector('.header__theme-toggle');
    if (themeToggle) {
        themeToggle.classList.add('animate-spin');
        setTimeout(() => {
            themeToggle.classList.remove('animate-spin');
        }, 300);
    }
}

/**
 * Инициализация обработчиков событий для темы
 */
function initThemeHandlers() {
    const themeToggle = document.querySelector('.header__theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

/**
 * Отслеживание изменений системной темы
 */
function initSystemThemeListener() {
    // Создаем медиа-запрос для определения темной темы
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Добавляем слушатель изменений
    darkModeMediaQuery.addEventListener('change', (e) => {
        // Если выбрана системная тема, обновляем при изменении системных настроек
        if (currentTheme === THEMES.SYSTEM) {
            applyTheme(THEMES.SYSTEM);
        }
    });
} 