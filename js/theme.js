const THEME_STORAGE_KEY = 'notJustAGame_theme';

const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
};

let currentTheme = THEMES.SYSTEM;

// Проверка поддержки localStorage
const isLocalStorageSupported = () => {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
        return false;
    }
};

// Проверка поддержки matchMedia
const isMatchMediaSupported = () => {
    return typeof window.matchMedia === 'function';
};

// Проверка поддержки CSS-переменных
const isCSSVariablesSupported = () => {
    return window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0);
};

// Определение поддержки системной темы
const isSystemDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

document.addEventListener('DOMContentLoaded', () => {
    if (!isCSSVariablesSupported()) {
        console.warn('CSS-переменные не поддерживаются в вашем браузере');
    }
    
    initTheme();
    
    if (isMatchMediaSupported()) {
        initSystemThemeListener();
    }
});

function initTheme() {
    const themeToggle = document.querySelector('.header__theme-toggle');
    const body = document.body;
    
    // Проверяем сохраненную тему
    if (isLocalStorageSupported()) {
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme) {
                currentTheme = savedTheme;
                applyTheme(currentTheme);
            } else {
                // Проверяем системные настройки
                if (isMatchMediaSupported()) {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    currentTheme = prefersDark ? THEMES.DARK : THEMES.LIGHT;
                } else {
                    currentTheme = THEMES.LIGHT;
                }
                applyTheme(currentTheme);
            }
        } catch (error) {
            console.error('Ошибка при работе с localStorage:', error);
            currentTheme = THEMES.LIGHT;
            applyTheme(currentTheme);
        }
    } else {
        console.warn('localStorage не поддерживается в вашем браузере');
        currentTheme = THEMES.LIGHT;
        applyTheme(currentTheme);
    }
    
    // Обработчик переключения темы
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function applyTheme(theme) {
    const body = document.body;
    const isDarkMode = theme === THEMES.DARK || 
                      (theme === THEMES.SYSTEM && 
                       isMatchMediaSupported() && 
                       window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
    
    updateThemeToggleIcon(isDarkMode);
    updateMetaThemeColor(isDarkMode);
}

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

function updateMetaThemeColor(isDarkMode) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.content = isDarkMode ? '#121212' : '#ffffff';
}

function toggleTheme() {
    currentTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    
    if (isLocalStorageSupported()) {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
        } catch (error) {
            console.error('Ошибка при сохранении темы:', error);
        }
    }
    
    applyTheme(currentTheme);
    animateThemeToggle();
}

function animateThemeToggle() {
    const themeToggle = document.querySelector('.header__theme-toggle');
    if (themeToggle) {
        themeToggle.classList.add('animate-spin');
        setTimeout(() => {
            themeToggle.classList.remove('animate-spin');
        }, 300);
    }
}

function initSystemThemeListener() {
    if (!isMatchMediaSupported()) {
        return;
    }
    
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    darkModeMediaQuery.addEventListener('change', (e) => {
        if (currentTheme === THEMES.SYSTEM) {
            applyTheme(THEMES.SYSTEM);
        }
    });
}

// Слушатель изменения системной темы
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

// Применяем тему при загрузке страницы
document.addEventListener('DOMContentLoaded', applyTheme); 