const THEME_KEY = 'notJustAGame_theme';

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
    
    const themeToggle = document.querySelector('.header__theme-toggle');
    const body = document.body;
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem(THEME_KEY);
    
    if (savedTheme) {
        // Используем сохраненную тему
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            updateThemeIcon(true);
        }
    } else {
        // Проверяем системные настройки
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-theme');
            updateThemeIcon(true);
            localStorage.setItem(THEME_KEY, 'dark');
        } else {
            localStorage.setItem(THEME_KEY, 'light');
        }
    }
    
    // Слушаем изменения системной темы
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) { // Только если пользователь не выбрал тему вручную
            if (e.matches) {
                body.classList.add('dark-theme');
                updateThemeIcon(true);
                localStorage.setItem(THEME_KEY, 'dark');
            } else {
                body.classList.remove('dark-theme');
                updateThemeIcon(false);
                localStorage.setItem(THEME_KEY, 'light');
            }
        }
    });
    
    // Обработчик клика по кнопке
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        
        // Сохраняем выбор пользователя
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
        
        // Обновляем иконку
        updateThemeIcon(isDark);
        
        // Добавляем анимацию
        themeToggle.classList.add('animate-spin');
        setTimeout(() => {
            themeToggle.classList.remove('animate-spin');
        }, 300);
    });
});

function updateThemeIcon(isDark) {
    const sunPaths = document.querySelectorAll('.sun');
    const moonPath = document.querySelector('.moon');
    
    if (isDark) {
        sunPaths.forEach(path => path.style.display = 'none');
        moonPath.style.display = 'block';
    } else {
        sunPaths.forEach(path => path.style.display = 'block');
        moonPath.style.display = 'none';
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