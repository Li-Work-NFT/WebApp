// mine.js
function loadMine(container) {
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Шахта';

    const description = document.createElement('p');
    description.textContent = 'Вы находитесь в шахте. Здесь можно добывать ресурсы: камень и руду.';

    // Кнопка добычи камня
    const btnStone = document.createElement('button');
    btnStone.className = 'pixel-btn';
    btnStone.textContent = 'Добывать камень';
    btnStone.onclick = () => mineStone(container);

    // Кнопка добычи руды
    const btnOre = document.createElement('button');
    btnOre.className = 'pixel-btn';
    btnOre.textContent = 'Добывать руду';
    btnOre.onclick = () => mineOre(container);

    // Кнопка возврата на карту
    const btnBack = document.createElement('button');
    btnBack.className = 'pixel-btn';
    btnBack.textContent = 'Вернуться на карту';
    btnBack.onclick = () => showLocation('map');

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(btnStone);
    container.appendChild(btnOre);
    container.appendChild(btnBack);
}

// Функция добычи камня
function mineStone(container) {
    const stone = {name: 'Камень', type: 'материал'};
    player.inventory.push(stone);

    const message = document.createElement('p');
    message.textContent = 'Вы добыли камень!';
    container.appendChild(message);
}

// Функция добычи руды
function mineOre(container) {
    const ore = {name: 'Руда', type: 'материал'};
    player.inventory.push(ore);

    const message = document.createElement('p');
    message.textContent = 'Вы добыли руду!';
    container.appendChild(message);
}

// Регистрируем локацию
registerLocation('mine', loadMine);
