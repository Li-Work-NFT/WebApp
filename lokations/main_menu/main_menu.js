// main_menu.js — главное меню игры в стиле pixel-RPG

function loadMainMenu() {
    // Фон и диалог
    createScene({
        background: 'assets/backgrounds/main_menu_bg.png',
        dialogue: `Привет, ${player.name} ${player.class}!`,
        buttons: [
            { text: 'Карта', onClick: () => showLocation('map') },
            { text: 'Инвентарь', onClick: () => showLocation('inventory') },
            { text: 'Персонаж', onClick: () => showLocation('character') },
            { text: 'Странник', onClick: () => showLocation('elder') }
        ]
    });
}

// Регистрация локации
registerLocation('main_menu', loadMainMenu);
