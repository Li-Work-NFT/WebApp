// main.js — центральный движок pixel-style RPG

// ------------------- Глобальные данные -------------------
const player = {
    name: '',
    class: '',
    level: 1,
    exp: 0,
    health: 100,
    silver: 100,
    inventory: [],
    quests: []
};

const locations = {};
const gameContainer = document.getElementById('game-container');

// ------------------- Регистрация и отображение локаций -------------------
function registerLocation(name, func) {
    locations[name] = func;
}

function showLocation(name) {
    if (locations[name]) {
        locations[name](gameContainer);
    } else {
        console.error(`Локация "${name}" не найдена!`);
        gameContainer.innerHTML = `<div class="dialogue-box">Локация "${name}" не найдена!</div>`;
    }
}

// ------------------- Универсальные функции интерфейса -------------------
function createButton(text, onClick) {
    const btn = document.createElement('button');
    btn.className = 'pixel-btn';
    btn.textContent = text;
    btn.onclick = onClick;
    return btn;
}

function createScene({ background, dialogue, buttons = [], extraContent, backButton }) {
    gameContainer.innerHTML = '';
    gameContainer.style.backgroundImage = `url(${background})`;
    gameContainer.style.backgroundSize = 'cover';
    gameContainer.style.backgroundPosition = 'center';
    gameContainer.style.backgroundRepeat = 'no-repeat';
    gameContainer.style.display = 'flex';
    gameContainer.style.flexDirection = 'column';
    gameContainer.style.justifyContent = 'space-between';
    gameContainer.style.alignItems = 'center';
    gameContainer.style.minHeight = '100vh';
    gameContainer.style.padding = '5px';
    gameContainer.style.boxSizing = 'border-box';

    if (dialogue) {
        const dialogueBox = document.createElement('div');
        dialogueBox.className = 'dialogue-box';
        dialogueBox.textContent = dialogue;
        gameContainer.appendChild(dialogueBox);
    }

    if (extraContent) {
        if (Array.isArray(extraContent)) {
            extraContent.forEach(c => gameContainer.appendChild(c));
        } else {
            gameContainer.appendChild(extraContent);
        }
    }

    // Кнопка «Назад» добавляется только если backButton передан
    if (backButton) {
        const btn = createButton(backButton.text, backButton.onClick);
        btn.classList.add('back-btn');
        gameContainer.appendChild(btn);
    }

    if (buttons.length > 0) {
        const buttonPanel = document.createElement('div');
        buttonPanel.className = 'button-panel';
        buttons.forEach(b => buttonPanel.appendChild(createButton(b.text, b.onClick)));
        gameContainer.appendChild(buttonPanel);
    }
}

// ------------------- Локации -------------------

// 1. Создание персонажа
function loadCharacterCreation() {
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Имя персонажа';
    nameInput.className = 'pixel-input';

    createScene({
        background: 'assets/backgrounds/elder.png',
        dialogue: 'Старейшина: Назови своё имя, путник...',
        extraContent: nameInput,
        buttons: [{
            text: 'Подтвердить имя',
            onClick: () => {
                const name = nameInput.value.trim();
                if (!name) return alert('Введите имя персонажа!');
                player.name = name;
                showLocation('choose_class');
            }
        }]
    });
}

// 2. Выбор класса
function chooseClass() {
    createScene({
        background: 'assets/backgrounds/elder.png',
        dialogue: `Старейшина: Отлично, ${player.name}. Выберите класс:`,
        buttons: [
            { text: 'Чародей', onClick: () => { player.class = 'Чародей'; showLocation('main_menu'); } },
            { text: 'Охотник', onClick: () => { player.class = 'Охотник'; showLocation('main_menu'); } },
            { text: 'Ремесленник', onClick: () => { player.class = 'Ремесленник'; showLocation('main_menu'); } }
        ]
    });
}

// 3. Главное меню
function loadMainMenu() {
    createScene({
        background: 'assets/backgrounds/main_menu.png',
        dialogue: `Главное меню — ${player.name} (${player.class})`,
        buttons: [
            { text: 'Карта', onClick: () => showLocation('map') },
            { text: 'Инвентарь', onClick: () => showLocation('inventory') },
            { text: 'Странник', onClick: () => showLocation('wanderer') },
            { text: 'Персонаж', onClick: () => showLocation('character') }
        ]
    });
}

// 4. Странник — только квесты
function loadWanderer() {
    const questsContainer = document.createElement('div');
    questsContainer.className = 'dialogue-box';
    questsContainer.style.textAlign = 'left';

    if (!player.quests || player.quests.length === 0) {
        questsContainer.textContent = 'Пока квестов нет.';
    } else {
        const ul = document.createElement('ul');
        player.quests.forEach(q => {
            const li = document.createElement('li');
            li.textContent = `${q.name} — ${q.status}`;
            ul.appendChild(li);
        });
        questsContainer.appendChild(ul);
    }

    createScene({
        background: 'assets/backgrounds/wanderer.png',
        dialogue: 'Странник готов дать вам квесты:',
        extraContent: questsContainer
        // Кнопок перехода на создание персонажа нет
    });
}

// 5. Деревня
function loadVillage() {
    createScene({
        background: 'assets/backgrounds/village.png',
        dialogue: 'Вы в деревне. Здесь начинается ваше путешествие.',
        buttons: [
            { text: 'Карта', onClick: () => showLocation('map') },
            { text: 'Инвентарь', onClick: () => showLocation('inventory') },
            { text: 'Персонаж', onClick: () => showLocation('character') },
            { text: 'Странник', onClick: () => showLocation('wanderer') }
        ]
    });
}

// 6. Карта
function loadMap() {
    createScene({
        background: 'assets/backgrounds/map.png',
        dialogue: 'Куда вы направитесь?',
        buttons: [
            { text: 'Лес', onClick: () => showLocation('forest') },
            { text: 'Шахта', onClick: () => showLocation('mine') },
            { text: 'Магазин', onClick: () => showLocation('shop') }
        ]
    });
}

// 7. Лес
function loadForest() {
    createScene({
        background: 'assets/backgrounds/forest.png',
        dialogue: 'Вы в лесу. Можно охотиться и добывать древесину.',
        buttons: [
            { text: 'Охотиться', onClick: () => { player.inventory.push({name:'Мясо', type:'еда'}); alert('Вы добыли мясо!'); } },
            { text: 'Срубить дерево', onClick: () => { player.inventory.push({name:'Древесина', type:'материал'}); alert('Вы получили древесину!'); } },
            { text: 'Назад на карту', onClick: () => showLocation('map') }
        ]
    });
}

// 8. Шахта
function loadMine() {
    createScene({
        background: 'assets/backgrounds/mine.png',
        dialogue: 'Темная шахта полна руды и опасностей.',
        buttons: [
            { text: 'Добывать руду', onClick: () => { player.inventory.push({name:'Руда', type:'материал'}); alert('Вы добыли руду!'); } },
            { text: 'Назад на карту', onClick: () => showLocation('map') }
        ]
    });
}

// 9. Инвентарь
function loadInventory() {
    const list = document.createElement('ul');
    if (player.inventory.length === 0) {
        const empty = document.createElement('li');
        empty.textContent = 'Инвентарь пуст.';
        list.appendChild(empty);
    } else {
        player.inventory.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} (${item.type})`;
            list.appendChild(li);
        });
    }

    createScene({
        background: 'assets/backgrounds/inventory_bg.png',
        dialogue: 'Ваш инвентарь:',
        extraContent: list,
        buttons: [
            { text: 'Назад в главное меню', onClick: () => showLocation('main_menu') }
        ]
    });
}

// 10. Персонаж
function loadCharacter() {
    const stats = document.createElement('div');
    stats.className = 'dialogue-box';
    stats.style.textAlign = 'left';
    stats.innerHTML = `
        Имя: ${player.name || '???'}<br>
        Класс: ${player.class || '???'}<br>
        Уровень: ${player.level}<br>
        Опыт: ${player.exp}<br>
        Здоровье: ${player.health}<br>
        Серебряники: ${player.silver}
    `;

    createScene({
        background: 'assets/backgrounds/character_bg.png',
        dialogue: '',
        extraContent: stats,
        buttons: [
            { text: 'Назад в главное меню', onClick: () => showLocation('main_menu') }
        ]
    });
}

// 11. Магазин
function loadShop() {
    if (typeof window.showShop === 'function') {
        window.showShop();
    } else {
        createScene({
            background: 'assets/backgrounds/shop_bg.png',
            dialogue: 'Магазин временно закрыт...',
            buttons: [
                { text: 'Назад на карту', onClick: () => showLocation('map') }
            ]
        });
    }
}

// ------------------- Регистрация всех локаций -------------------
registerLocation('character_creation', loadCharacterCreation);
registerLocation('choose_class', chooseClass);
registerLocation('main_menu', loadMainMenu);
registerLocation('wanderer', loadWanderer);
registerLocation('village', loadVillage);
registerLocation('map', loadMap);
registerLocation('forest', loadForest);
registerLocation('mine', loadMine);
registerLocation('inventory', loadInventory);
registerLocation('character', loadCharacter);
registerLocation('shop', loadShop);

// ------------------- Старт игры -------------------
window.onload = () => {
    showLocation('character_creation');
};
