// forest.js
function loadForest(container) {
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Лес';

    const description = document.createElement('p');
    description.textContent = 'Вы в густом лесу. Здесь можно добывать ресурсы: мясо и древесину.';

    const btnHunt = document.createElement('button');
    btnHunt.className = 'pixel-btn'; // общий стиль
    btnHunt.textContent = 'Охотиться ';
    btnHunt.onclick = () => hunt(container);

    const btnChop = document.createElement('button');
    btnChop.className = 'pixel-btn'; // общий стиль
    btnChop.textContent = 'Рубить лес';
    btnChop.onclick = () => chopWood(container);


    // Кнопка возврата на карту
    const btnBack = document.createElement('button');
    btnBack.className = 'pixel-btn';
    btnBack.textContent = 'Вернуться на карту';
    btnBack.onclick = () => showLocation('map');

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(btnHunt);
    container.appendChild(btnChop);
    container.appendChild(btnBack);
}

// Функция охоты
function hunt(container) {
    const meat = {name: 'Мясо', type: 'еда'};
    player.inventory.push(meat);

    const message = document.createElement('p');
    message.textContent = 'Вы успешно охотились и получили мясо!';
    container.appendChild(message);
}

// Функция рубки леса
function chopWood(container) {
    const wood = {name: 'Древесина', type: 'материал'};
    player.inventory.push(wood);

    const message = document.createElement('p');
    message.textContent = 'Вы срубили дерево и получили древесину!';
    container.appendChild(message);
}

// Регистрируем локацию
registerLocation('forest', loadForest);
