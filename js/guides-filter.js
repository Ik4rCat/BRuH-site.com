document.addEventListener('DOMContentLoaded', function() {
    const genreFilter = document.getElementById('genre-filter');
    const typeFilter = document.getElementById('type-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const resetButton = document.querySelector('.reset-filters-btn');
    const guideItems = document.querySelectorAll('.guide-item');
    const noResultsMessage = document.querySelector('.no-results-message');
    
    // Инициализация фильтров
    if (!genreFilter || !typeFilter || !difficultyFilter || !resetButton) {
        console.warn('Элементы фильтров не найдены');
        return;
    }
    
    // Обработчики событий для фильтров
    genreFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
    difficultyFilter.addEventListener('change', applyFilters);
    resetButton.addEventListener('click', resetFilters);
    
    // Применение фильтров
    function applyFilters() {
        const selectedGenre = genreFilter.value;
        const selectedType = typeFilter.value;
        const selectedDifficulty = difficultyFilter.value;
        
        let visibleItems = 0;
        
        guideItems.forEach(item => {
            const genre = item.getAttribute('data-genre');
            const type = item.getAttribute('data-type');
            const difficulty = item.getAttribute('data-difficulty');
            
            const matchesGenre = selectedGenre === 'all' || genre === selectedGenre;
            const matchesType = selectedType === 'all' || type === selectedType;
            const matchesDifficulty = selectedDifficulty === 'all' || difficulty === selectedDifficulty;
            
            if (matchesGenre && matchesType && matchesDifficulty) {
                item.style.display = '';
                visibleItems++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Отображение сообщения, если нет результатов
        if (visibleItems === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }
    
    // Сброс фильтров
    function resetFilters() {
        genreFilter.value = 'all';
        typeFilter.value = 'all';
        difficultyFilter.value = 'all';
        
        guideItems.forEach(item => {
            item.style.display = '';
        });
        
        noResultsMessage.style.display = 'none';
    }
}); 