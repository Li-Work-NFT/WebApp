// elder.js — экран странника (квесты)

function loadElder(container) {
    const questsContainer = document.createElement('div');
    questsContainer.className = 'dialogue-box';
    questsContainer.style.textAlign = 'left';

    if (!player.quests || player.quests.length === 0) {
        questsContainer.textContent = 'Пока квестов нет.';
    } else {
        const ul = document.createElement('ul');
        player.quests.forEach(q => {
            const li = document.createElement('li');
            li.textContent = `${q.name}: ${q.description || 'Нет описания'}`;
            ul.appendChild(li);
        });
        questsContainer.appendChild(ul);
    }

    createScene({
        background: 'assets/backgrounds/elder.png',
        dialogue: `Странник: ${player.name || 'Путник'}, здесь твои текущие квесты:`,
        extraContent: questsContainer,
        buttons: [
            { text: 'Главное меню', onClick: () => showLocation('main_menu') }
        ]
    });
}

// Регистрируем локацию
registerLocation('elder', loadElder);
