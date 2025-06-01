// Проверка поддержки GSAP
const isGSAPSupported = () => {
    return typeof gsap !== 'undefined';
};

// Функция для дебаунсинга
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Функция для безопасной анимации
const safeAnimate = (element, animation) => {
    if (!isGSAPSupported()) {
        console.warn('GSAP не поддерживается');
        return;
    }
    
    try {
        gsap.to(element, animation);
    } catch (error) {
        console.error('Ошибка при анимации:', error);
        // Применяем изменения без анимации
        if (animation.onComplete) {
            animation.onComplete();
        }
    }
};

// Функция для инициализации фильтра гайдов
function initGuidesFilter() {
    const filterButtons = document.querySelectorAll('.guides-filter__button');
    const guideCards = document.querySelectorAll('.guide-card');
    
    if (!filterButtons.length || !guideCards.length) {
        console.warn('Элементы фильтра или карточки гайдов не найдены');
        return;
    }
    
    // Функция для фильтрации гайдов
    const filterGuides = debounce((category) => {
        guideCards.forEach(card => {
            if (!card) return;
            
            const cardCategory = card.dataset.category;
            const shouldShow = category === 'all' || cardCategory === category;
            
            safeAnimate(card, {
                opacity: shouldShow ? 1 : 0,
                scale: shouldShow ? 1 : 0.8,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    if (card) {
                        card.style.display = shouldShow ? 'block' : 'none';
                    }
                }
            });
        });
    }, 300);
    
    // Обработчики для кнопок фильтра
    filterButtons.forEach(button => {
        if (!button) return;
        
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Обновляем активную кнопку
            filterButtons.forEach(btn => {
                if (btn) {
                    btn.classList.remove('active');
                }
            });
            button.classList.add('active');
            
            // Фильтруем гайды
            filterGuides(category);
        });
    });
    
    // Активируем фильтр "Все" по умолчанию
    const allButton = Array.from(filterButtons).find(btn => btn && btn.dataset.category === 'all');
    if (allButton) {
        allButton.click();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initGuidesFilter); 