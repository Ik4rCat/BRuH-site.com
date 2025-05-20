const THEME_STORAGE_KEY = 'notJustAGame_theme';

const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
};

let currentTheme = THEMES.SYSTEM;

document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    initThemeHandlers();
});

function loadSavedTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    } else if (savedTheme === 'false') {
        document.body.classList.remove('dark-theme');
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
        }
    }
    
    updateThemeToggleIcon(document.body.classList.contains('dark-theme'));
    updateMetaThemeColor(document.body.classList.contains('dark-theme'));
}

function applyTheme(theme) {
    const body = document.body;
    const isDarkMode = theme === THEMES.DARK || 
                      (theme === THEMES.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
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
    const body = document.body;
    const isDarkTheme = body.classList.toggle('dark-theme');
    
    localStorage.setItem(THEME_STORAGE_KEY, isDarkTheme);
    
    updateThemeToggleIcon(isDarkTheme);
    
    updateMetaThemeColor(isDarkTheme);
    
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

function initThemeHandlers() {
    const themeToggle = document.querySelector('.header__theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function initSystemThemeListener() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    darkModeMediaQuery.addEventListener('change', (e) => {
        if (currentTheme === THEMES.SYSTEM) {
            applyTheme(THEMES.SYSTEM);
        }
    });
} 