// town.js
function loadTown(container) {
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Деревня';

    const description = document.createElement('p');
    description.textContent = 'Вы находитесь в деревне. Здесь можно отдохнуть и вернуться на карту.';

    // Кнопка перехода на карту
    const btnMap = document.createElement('button');
    btnMap.textContent = 'Вернуться на карту';
    btnMap.onclick = () => showLocation('map');

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(btnMap);
}

// Регистрируем локацию
registerLocation('town', loadTown);
