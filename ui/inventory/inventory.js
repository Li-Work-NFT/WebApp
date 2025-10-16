// inventory.js
function loadInventory(container) {
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Инвентарь';

    const description = document.createElement('p');
    description.textContent = 'Здесь хранятся все собранные предметы:';

    const list = document.createElement('ul');
    if (player.inventory.length === 0) {
        const empty = document.createElement('li');
        empty.textContent = 'Инвентарь пуст.';
        list.appendChild(empty);
    } else {
        player.inventory.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} (${item.type})`;
            list.appendChild(li);
        });
    }

    const btnBack = document.createElement('button');
    btnBack.className = 'pixel-btn'; // <-- именно это добавляет нужный стиль
    btnBack.textContent = 'Назад в меню';
    btnBack.onclick = () => showLocation('main_menu');


    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(list);
    container.appendChild(btnBack);
}

// Регистрируем локацию
registerLocation('inventory', loadInventory);
