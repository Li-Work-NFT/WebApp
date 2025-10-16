// character_creation.js — создание персонажа и выбор класса

function loadCharacterCreation(container) {
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Имя персонажа';
    nameInput.className = 'pixel-input';

    createScene({
        background: 'assets/backgrounds/elder.png',
        dialogue: 'Старейшина: Назови своё имя, путник...',
        extraContent: nameInput,
        buttons: [
            {
                text: 'Подтвердить имя',
                onClick: () => {
                    const name = nameInput.value.trim();
                    if (!name) return alert('Введите имя персонажа!');
                    player.name = name;
                    showLocation('choose_class');
                }
            }
        ]
    });
}

// Выбор класса
function chooseClass(container) {
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

registerLocation('character_creation', loadCharacterCreation);
registerLocation('choose_class', chooseClass);
