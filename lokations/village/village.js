if (!player) {
    console.warn('Игрок не найден, но пропускаем повторное создание.');
}

// village.js
function loadVillage(container) {
    const title = document.createElement('h2');
    title.textContent = 'Деревня';

    const description = document.createElement('p');
    description.textContent = 'Вы находитесь в деревне. Старейшина подходит к вам.';

    const btnTalk = document.createElement('button');
    btnTalk.textContent = 'Поговорить со старейшиной';
    btnTalk.onclick = () => {
        startDialogue(container);
    };

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(btnTalk);
}

// Простейший диалог со старейшиной
function startDialogue(container) {
    container.innerHTML = ''; // очищаем сцену
    const dialogue = document.createElement('p');
    dialogue.textContent = 'Старейшина: Кто ты, путник?';

    const btnCreate = document.createElement('button');
    btnCreate.textContent = 'Создать персонажа';
    btnCreate.onclick = () => showLocation('character_creation');

    container.appendChild(dialogue);
    container.appendChild(btnCreate);
}

// Регистрируем локацию
registerLocation('village', loadVillage);

const btnShop = document.createElement('button');
btnShop.textContent = 'Посетить лавку';
btnShop.onclick = () => showLocation('shop');
container.appendChild(btnShop);
