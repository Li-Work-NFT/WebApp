// lokations/map/map.js

function loadMap(container) {
    createScene({
        background: 'assets/backgrounds/map.png',
        dialogue: 'Куда вы направитесь?',
        buttons: [
            { text: 'Лес', onClick: () => showLocation('forest') },
            { text: 'Шахта', onClick: () => showLocation('mine') },
            { text: 'Магазин', onClick: () => showLocation('shop') }, // кнопка магазина
            { text: 'Главное меню', onClick: () => showLocation('main_menu') }
        ]
    });
}

registerLocation('map', loadMap);
