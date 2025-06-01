// Функция для загрузки данных из JSON файла
async function loadGamesData() {
    try {
        const response = await fetch('/games-info.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Проверяем структуру данных
        if (!data || typeof data !== 'object') {
            throw new Error('Неверный формат данных');
        }
        
        if (!data.new_releases || !data.upcoming) {
            throw new Error('Отсутствуют необходимые разделы данных');
        }
        
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return null;
    }
}

// Функция для создания карточки игры
function createGameCard(gameData) {
    if (!gameData || typeof gameData !== 'object') {
        console.error('Неверные данные игры:', gameData);
        return null;
    }
    
    try {
        const card = document.createElement('article');
        card.className = 'game-card';
        
        // Проверяем наличие обязательных полей
        const title = gameData.title || 'Без названия';
        const image = gameData.image || '/img/games/placeholder.svg';
        const description = gameData.description || 'Описание отсутствует';
        const genre = gameData.genre || 'Жанр не указан';
        const releaseDate = gameData.release_date || 'Дата не указана';
        const rating = gameData.rating || '—';
        const url = gameData.steam_url || gameData.official_url || '#';
        
        card.innerHTML = `
            <div class="game-card__image-container">
                <img 
                    src="${image}" 
                    alt="${title}"
                    class="game-card__image"
                    loading="lazy"
                    onerror="this.src='/img/games/placeholder.svg'"
                >
                <div class="game-card__rating">
                    <span class="game-card__rating-number">${rating}</span>
                </div>
            </div>
            <div class="game-card__content">
                <h3 class="game-card__title">${title}</h3>
                <p class="game-card__description">${description}</p>
                <div class="game-card__meta">
                    <span class="game-card__genre">${genre}</span>
                    <span class="game-card__release">${releaseDate}</span>
                </div>
                <a href="${url}" class="game-card__link" target="_blank" rel="noopener">
                    ${gameData.steam_url ? 'Открыть в Steam' : 'Официальный сайт'}
                </a>
            </div>
        `;
        
        return card;
    } catch (error) {
        console.error('Ошибка при создании карточки игры:', error);
        return null;
    }
}

// Функция для обновления раздела с играми
async function updateGamesSection(sectionId, gamesData) {
    if (!sectionId || !gamesData) {
        console.error('Отсутствуют необходимые параметры');
        return;
    }
    
    const section = document.getElementById(sectionId);
    if (!section) {
        console.warn(`Секция с ID "${sectionId}" не найдена`);
        return;
    }

    const gamesGrid = section.querySelector('.games-page-grid');
    if (!gamesGrid) {
        console.warn(`Сетка игр не найдена в секции "${sectionId}"`);
        return;
    }

    try {
        // Очищаем текущее содержимое
        gamesGrid.innerHTML = '';

        // Определяем, какие игры нужно отобразить
        let gamesToShow;
        if (sectionId === 'new-releases' || sectionId === 'home-new-releases') {
            gamesToShow = gamesData.new_releases;
        } else if (sectionId === 'upcoming-games' || sectionId === 'home-upcoming') {
            gamesToShow = gamesData.upcoming;
        } else if (sectionId === 'popular-games') {
            // Для популярных игр создаем новый объект с уникальными ключами
            gamesToShow = {};
            Object.entries(gamesData.new_releases).forEach(([key, game]) => {
                gamesToShow[`new_${key}`] = game;
            });
            Object.entries(gamesData.upcoming).forEach(([key, game]) => {
                gamesToShow[`upcoming_${key}`] = game;
            });
        }

        if (!gamesToShow || Object.keys(gamesToShow).length === 0) {
            console.warn(`Нет игр для отображения в секции "${sectionId}"`);
            return;
        }

        // Создаем и добавляем карточки игр
        for (const gameKey in gamesToShow) {
            const gameCard = createGameCard(gamesToShow[gameKey]);
            if (gameCard) {
                gamesGrid.appendChild(gameCard);
            }
        }
    } catch (error) {
        console.error(`Ошибка при обновлении секции "${sectionId}":`, error);
    }
}

// Функция для обновления главной страницы
async function updateHomePage(gamesData) {
    if (!gamesData) {
        console.error('Отсутствуют данные игр');
        return;
    }
    
    try {
        // Обновляем секцию новых релизов
        const newReleasesSection = document.getElementById('home-new-releases');
        if (newReleasesSection) {
            const newReleasesGrid = newReleasesSection.querySelector('.games-grid');
            if (newReleasesGrid) {
                newReleasesGrid.innerHTML = '';
                for (const gameKey in gamesData.new_releases) {
                    const gameCard = createGameCard(gamesData.new_releases[gameKey]);
                    if (gameCard) {
                        newReleasesGrid.appendChild(gameCard);
                    }
                }
            }
        }

        // Обновляем секцию ожидаемых игр
        const upcomingSection = document.getElementById('home-upcoming');
        if (upcomingSection) {
            const upcomingGrid = upcomingSection.querySelector('.games-grid');
            if (upcomingGrid) {
                upcomingGrid.innerHTML = '';
                for (const gameKey in gamesData.upcoming) {
                    const gameCard = createGameCard(gamesData.upcoming[gameKey]);
                    if (gameCard) {
                        upcomingGrid.appendChild(gameCard);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Ошибка при обновлении главной страницы:', error);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const gamesData = await loadGamesData();
        if (!gamesData) {
            console.error('Не удалось загрузить данные игр');
            return;
        }

        // Определяем текущую страницу
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Обновляем соответствующие разделы
        switch (currentPage) {
            case 'index.html':
            case '':
                await updateHomePage(gamesData);
                break;
            case 'new.html':
                await updateGamesSection('new-releases', gamesData);
                break;
            case 'upcoming.html':
                await updateGamesSection('upcoming-games', gamesData);
                break;
            case 'popular.html':
                await updateGamesSection('popular-games', gamesData);
                break;
            default:
                console.warn(`Неизвестная страница: ${currentPage}`);
        }
    } catch (error) {
        console.error('Ошибка при инициализации страницы:', error);
    }
}); 