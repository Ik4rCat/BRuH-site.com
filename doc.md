# Документация по проекту "Not Just a Game"

## 1. Обзор проекта

"Not Just a Game" - это веб-сайт о видеоиграх, который предоставляет пользователям гайды, советы и информацию о различных играх. Проект реализован с использованием HTML, CSS и JavaScript без использования фреймворков, что делает его легким и быстрым.

Основной функционал проекта:
- Отображение различных гайдов по играм
- Система фильтрации гайдов по жанру, типу и сложности
- Адаптивный дизайн для различных устройств
- Переключение между светлой и темной темами оформления

## 2. Структура проекта

Проект имеет следующую структуру директорий:

```
Not Just a Game/
├── css/
│   ├── base.css
│   ├── components.css
│   ├── layout.css
│   ├── motion.css
│   └── theme.css
├── js/
│   ├── app.js
│   ├── theme.js
│   └── guides-filter.js
├── pages/
│   ├── guides/
│   │   ├── baldurs-gate-3-best-builds.html
│   │   ├── elden-ring-erdtree-bosses.html
│   │   ├── starfield-ship-building.html
│   │   ├── horizon-3-new-dawn.html
│   │   └── ... (другие гайды)
│   ├── guides.html
│   ├── new.html
│   ├── popular.html
│   └── upcoming.html
├── images/
│   └── ... (изображения)
├── index.html
└── README.md
```

## 3. Анализ HTML-структуры

### 3.1. Общая структура HTML-страниц

Все HTML-страницы имеют похожую структуру:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <!-- Мета-теги, заголовок, стили -->
</head>
<body>
    <!-- Шапка сайта -->
    <header class="header">...</header>
    
    <!-- Заголовок страницы -->
    <div class="page-header">...</div>
    
    <!-- Основное содержимое -->
    <main class="...">...</main>
    
    <!-- Подвал сайта -->
    <footer class="footer">...</footer>
    
    <!-- JavaScript скрипты -->
    <script src="..."></script>
</body>
</html>
```

### 3.2. Шапка сайта (header)

Шапка сайта содержит:
- Логотип с ссылкой на главную страницу
- Навигационное меню с ссылками на основные разделы
- Кнопку переключения темы

```html
<header class="header">
    <div class="container header__container">
        <a href="../../index.html" class="header__logo">Not Just a Game</a>
        <nav class="header__nav">
            <a href="../new.html" class="header__link">Новинки</a>
            <a href="../popular.html" class="header__link">Популярное</a>
            <a href="../upcoming.html" class="header__link">Ожидаемые</a>
            <a href="../guides.html" class="header__link">Гайды</a>
        </nav>
        <button class="header__theme-toggle" aria-label="Переключить тему">
            <svg class="theme-icon" width="24" height="24" viewBox="0 0 24 24">
                <!-- Иконки солнца и луны для темы -->
            </svg>
        </button>
    </div>
</header>
```

### 3.3. Структура страницы гайдов (guides.html)

Страница `guides.html` содержит:
1. Фильтры для сортировки гайдов
2. Список гайдов в виде карточек

```html
<!-- Фильтры -->
<div class="guides-filters">
    <div class="guides-filters__group">
        <label class="guides-filters__label">Жанр:</label>
        <select class="guides-filters__select" name="genre">
            <!-- Опции фильтров -->
        </select>
    </div>
    <!-- Аналогичные блоки для других фильтров -->
</div>

<!-- Список гайдов -->
<div class="guides-list">
    <article class="guide-item">
        <!-- Содержимое карточки гайда -->
    </article>
    <!-- Другие карточки гайдов -->
</div>
```

### 3.4. Структура страницы конкретного гайда

Страницы гайдов (например, `baldurs-gate-3-best-builds.html`) имеют следующую структуру:
1. Заголовок страницы и метаданные гайда
2. Изображение игры
3. Описание гайда
4. Содержание (оглавление)
5. Секции с контентом гайда
6. Завершающая информация

```html
<div class="guide-header">
    <div class="guide-header__meta">
        <!-- Метаданные: игра, тип, дата, сложность -->
    </div>
    
    <div class="guide-header__image">
        <!-- Изображение игры -->
    </div>
    
    <div class="guide-header__description">
        <!-- Описание гайда -->
    </div>
    
    <div class="guide-header__toc">
        <!-- Содержание (оглавление) -->
    </div>
</div>

<!-- Секции с контентом -->
<div class="guide-section" id="section-id">
    <h2 class="guide-section__title">Название секции</h2>
    <div class="guide-section__content">
        <!-- Контент секции -->
    </div>
</div>

<!-- Другие секции -->

<div class="guide-footer">
    <!-- Завершающая информация -->
</div>
```

## 4. Анализ JavaScript-функциональности

### 4.1. Система фильтрации гайдов (guides-filter.js)

Файл `guides-filter.js` реализует функциональность фильтрации гайдов на странице `guides.html`. Код оптимизирован и очищен от комментариев для повышения читаемости и производительности.

Основная функция `initGuidesFilter()` выполняет следующие задачи:
1. Инициализирует обработчики событий для селекторов фильтров
2. Реализует фильтрацию гайдов в соответствии с выбранными значениями
3. Управляет отображением сообщения об отсутствии результатов
4. Добавляет кнопку сброса фильтров

Ключевые функции системы фильтрации:
- `filterGuides()` - основная функция фильтрации, анализирующая значения фильтров
- `getTagValue(item, type)` - извлекает значение тега определенного типа из карточки гайда
- `getGenreValue(tagText)`, `getTypeValue(tagText)`, `getDifficultyValue(tagText)` - нормализуют значения тегов для сравнения с фильтрами
- `toggleNoResultsMessage(show)` - управляет отображением сообщения, если по заданным фильтрам ничего не найдено
- `resetFilters()` - сбрасывает все фильтры в исходное состояние

Пример кода функции фильтрации:

```javascript
function filterGuides() {
    const filters = {};
    filterSelects.forEach(select => {
        filters[select.name] = select.value;
    });
    
    guideItems.forEach(item => {
        const genreTag = getTagValue(item, 'genre');
        const typeTag = getTagValue(item, 'type');
        const difficultyTag = getTagValue(item, 'difficulty');
        
        const matchesGenre = filters.genre === 'all' || genreTag === filters.genre;
        const matchesType = filters.type === 'all' || typeTag === filters.type;
        const matchesDifficulty = filters.difficulty === 'all' || difficultyTag === filters.difficulty;
        
        if (matchesGenre && matchesType && matchesDifficulty) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    const visibleGuides = document.querySelectorAll('.guide-item[style="display: flex"]');
    toggleNoResultsMessage(visibleGuides.length === 0);
}
```

### 4.2. Другие JavaScript-файлы

Проект использует следующие JavaScript файлы:

#### 4.2.1. theme.js
Управляет переключением между светлой и темной темами оформления. Основные функции:
- `loadSavedTheme()` - загружает сохраненную тему при загрузке страницы
- `applyTheme(theme)` - применяет указанную тему
- `toggleTheme()` - переключает между светлой и темной темами
- `updateThemeToggleIcon(isDarkMode)` - обновляет иконку переключателя тем
- `updateMetaThemeColor(isDarkMode)` - обновляет мета-тег цвета темы

#### 4.2.2. app.js
Содержит общую функциональность сайта, включая:
- `initPreloader()` - инициализирует и удаляет прелоадер
- `initAnimations()` - настраивает анимации для различных элементов страницы
- `setupEventListeners()` - устанавливает обработчики событий
- `initScrollAnimations()` - инициализирует анимации при прокрутке
- `toggleTheme()` - переключает тему оформления
- `loadSavedTheme()` - загружает сохраненную тему

Все JavaScript файлы очищены от комментариев для повышения производительности и читаемости кода.

## 5. Анализ CSS-структуры (на основе классов)

### 5.1. Организация CSS

CSS-файлы структурированы по функциональному назначению:
- `theme.css` - стили для светлой и темной тем
- `base.css` - базовые стили и сброс стилей браузера
- `layout.css` - макеты и сетки
- `components.css` - компоненты интерфейса (кнопки, карточки, формы)
- `motion.css` - анимации и переходы

### 5.2. Система именования классов

Проект использует методологию БЭМ (Блок-Элемент-Модификатор) для именования классов:
- Блоки: `guide-item`, `guides-filters`, `game-card`
- Элементы: `guide-item__title`, `guides-filters__group`, `game-card__image`
- Модификаторы: `guide-item--featured`, `game-card__button--active`

### 5.3. Компоненты интерфейса

Основные компоненты, определяемые по классам:
1. `header` - шапка сайта
2. `footer` - подвал сайта
3. `guide-item` - карточка гайда
4. `guide-section` - секция в гайде
5. `guides-filters` - фильтры для гайдов
6. `game-card` - карточка игры

## 6. Последние обновления проекта

### 6.1. Добавление нового гайда
Добавлен новый гайд "Руководство для начинающих в Horizon 3: New Dawn" (`horizon-3-new-dawn.html`), который включает:
- Подробное руководство по основным аспектам игры
- Рекомендации по выбору навыков и оружия
- Стратегии боя с различными типами машин
- Советы по исследованию мира

### 6.2. Оптимизация интерфейса страницы гайдов
- Удалена пагинация, так как на текущем этапе количество гайдов невелико
- Улучшена система фильтрации для более эффективной работы

### 6.3. Оптимизация кода
- Удалены комментарии из JavaScript файлов для повышения производительности
- Сохранена читаемость кода с помощью понятных имен функций и переменных
- Улучшена структура HTML для лучшей семантики

## 7. Выводы и рекомендации

### 7.1. Сильные стороны проекта
- Чистая и понятная структура HTML
- Модульная организация CSS по методологии БЭМ
- Эффективная система фильтрации гайдов
- Семантическая разметка, способствующая SEO
- Адаптивный дизайн, работающий на разных устройствах
- Переключение между светлой и темной темами
- Регулярное пополнение контента новыми гайдами

### 7.2. Возможные улучшения
1. Сохранение состояния фильтров в localStorage или URL-параметрах
2. Реализация поиска по гайдам
3. Добавление фильтрации по дате публикации
4. Оптимизация загрузки изображений (lazy loading для всех изображений)
5. Внедрение микроразметки Schema.org для улучшения SEO
6. Кэширование данных на клиентской стороне для повышения производительности
7. Добавление пользовательских рейтингов и комментариев к гайдам

### 7.3. Планы по расширению
1. Создание системы пользовательских аккаунтов
2. Добавление возможности сохранения любимых гайдов
3. Разработка мобильного приложения
4. Интеграция с игровыми платформами для получения актуальной информации
5. Внедрение системы уведомлений о новых гайдах и обновлениях 