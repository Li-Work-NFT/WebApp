// ui/character/character.js — экран персонажа в pixel-style

function loadCharacter() {
    const info = document.createElement('div');
    info.className = 'dialogue-box';
    info.style.textAlign = 'left';
    info.innerHTML = `
        Имя: ${player.name || '???'}<br>
        Класс: ${player.class || '???'}<br>
        Уровень: ${player.level}<br>
        Опыт: ${player.exp}<br>
        Здоровье: ${player.health}<br>
        Золото: ${player.silver}
    `;

    createScene({
        background: 'assets/backgrounds/character_bg.png',
        dialogue: '', // сам текст в extraContent
        extraContent: info,
        buttons: [
            { text: 'Главное меню', onClick: () => showLocation('main_menu') }
        ]
    });
}

// Регистрируем локацию
registerLocation('character', loadCharacter);
