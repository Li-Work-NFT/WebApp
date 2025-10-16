// ui/shop/shop.js

const shopItems = {
    armor_iron: { name: 'Железная броня', icon: 'armor_iron.png', price: 100, description: 'Прочная защита из железа.', category: 'Экипировка' },
    armor_leather: { name: 'Кожаная броня', icon: 'armor_leather.png', price: 50, description: 'Гибкая и лёгкая защита.', category: 'Экипировка' },
    boots_leather: { name: 'Кожаные сапоги', icon: 'boots_leather.png', price: 30, description: 'Удобная обувь для приключений.', category: 'Экипировка' },
    helmet_iron: { name: 'Железный шлем', icon: 'helmet_iron.png', price: 70, description: 'Защищает голову от ударов.', category: 'Экипировка' },
    helmet_leather: { name: 'Кожаная накидка', icon: 'helmet_leather.png', price: 25, description: 'Лёгкая защита головы.', category: 'Экипировка' },
    robe_mage: { name: 'Мантия мага', icon: 'robe_mage.png', price: 80, description: 'Волшебная одеяние, усиливает магию.', category: 'Экипировка' },
    shield_wood: { name: 'Деревянный щит', icon: 'shield_wood.png', price: 45, description: 'Простой, но надёжный щит.', category: 'Экипировка' },

    sword: { name: 'Стальной меч', icon: 'sword.png', price: 85, description: 'Надёжное оружие ближнего боя.', category: 'Оружие' },
    bow_wood: { name: 'Деревянный лук', icon: 'bow_wood.png', price: 60, description: 'Оружие дальнего боя.', category: 'Оружие' },
    staff_mage: { name: 'Магический посох', icon: 'staff_mage.png', price: 90, description: 'Усиливает магические способности.', category: 'Оружие' },

    bread: { name: 'Хлеб', icon: 'bread.png', price: 5, description: 'Простой и питательный хлеб.', category: 'Провизия' },
    water: { name: 'Вода', icon: 'water.png', price: 3, description: 'Чистая питьевая вода.', category: 'Провизия' },
    meat: { name: 'Мясо', icon: 'meat.png', price: 6, description: 'Сырое мясо, можно приготовить.', category: 'Провизия' },
    fish: { name: 'Рыба', icon: 'fish.png', price: 8, description: 'Свежевыловленная рыба.', category: 'Провизия' },
    potion_health: { name: 'Зелье лечения', icon: 'potion_health.png', price: 20, description: 'Восстанавливает здоровье.', category: 'Провизия' },
    potion_mana: { name: 'Зелье маны', icon: 'potion_mana.png', price: 20, description: 'Восстанавливает ману.', category: 'Провизия' },

    axe: { name: 'Топор', icon: 'axe.png', price: 35, description: 'Надёжный инструмент для рубки.', category: 'Инструменты' },
    pickaxe: { name: 'Кирка', icon: 'pickaxe.png', price: 35, description: 'Инструмент для шахты.', category: 'Инструменты' },
    fishing_rod: { name: 'Удочка', icon: 'fishing_rod.png', price: 40, description: 'Позволяет ловить рыбу.', category: 'Инструменты' },
    shovel: { name: 'Лопата', icon: 'shovel.png', price: 25, description: 'Инструмент для копки.', category: 'Инструменты' },

    wood: { name: 'Дерево', icon: 'wood.png', price: 5, description: 'Материал для строительства.', category: 'Ресурсы' },
    stone: { name: 'Камень', icon: 'stone.png', price: 5, description: 'Обычный камень.', category: 'Ресурсы' },
    iron_ore: { name: 'Металлическая руда', icon: 'iron_ore.png', price: 10, description: 'Руда для плавки железа.', category: 'Ресурсы' },
};

const shopCategories = ['Экипировка', 'Оружие', 'Провизия', 'Ресурсы', 'Инструменты'];

function loadShop() {
    const buttons = shopCategories.map(cat => ({
        text: cat,
        onClick: () => showShopCategory(cat)
    }));

    buttons.push({ text: 'Назад на карту', onClick: () => showLocation('map') });

    createScene({
        background: 'assets/backgrounds/shop_bg.png',
        dialogue: 'Выберите категорию:',
        buttons
    });
}

function showShopCategory(category) {
    const items = Object.values(shopItems).filter(i => i.category === category);

    const container = document.createElement('div');
    container.className = 'shop-grid';

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'shop-item';

        const img = document.createElement('img');
        img.src = `assets/icons/${item.icon}`;
        img.alt = item.name;
        img.className = 'shop-item-img';

        const nameP = document.createElement('p');
        nameP.className = 'shop-item-name';
        nameP.innerHTML = `${item.name} <img src="assets/icons/coin.png" class="coin-icon-small"> ${item.price}`;

        itemDiv.append(img, nameP);
        itemDiv.addEventListener('click', () => openShopModal(item));

        container.appendChild(itemDiv);
    });

    createScene({
        background: 'assets/backgrounds/shop_bg.png',
        dialogue: `Категория: ${category}`,
        extraContent: container,
        buttons: [
            { text: 'Назад в магазин', onClick: loadShop }
        ]
    });
}

function openShopModal(item) {
    const backdrop = document.createElement('div');
    backdrop.className = 'shop-modal-backdrop';

    const modal = document.createElement('div');
    modal.className = 'shop-modal';

    const title = document.createElement('h3');
    title.textContent = item.name;

    const img = document.createElement('img');
    img.src = `assets/icons/${item.icon}`;
    img.className = 'shop-modal-icon';

    const desc = document.createElement('p');
    desc.textContent = item.description;

    const price = document.createElement('p');
    price.innerHTML = `<img src="assets/icons/coin.png" class="coin-icon-small"> ${item.price}`;

    const qtyLabel = document.createElement('label');
    qtyLabel.textContent = 'Количество: ';
    qtyLabel.className = 'quantity-label';

    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.min = 1;
    qtyInput.value = 1;
    qtyInput.className = 'quantity-input';

    const btnBuy = document.createElement('button');
    btnBuy.className = 'pixel-btn';
    btnBuy.textContent = 'Купить';
    btnBuy.onclick = () => {
        const qty = parseInt(qtyInput.value);
        const totalPrice = item.price * qty;
        if (player.silver >= totalPrice) {
            player.silver -= totalPrice;
            for (let i = 0; i < qty; i++) {
                player.inventory.push({ name: item.name, type: item.category });
            }
            alert(`${qty} × ${item.name} перемещено в инвентарь!`);
            backdrop.remove();
        } else {
            alert('Недостаточно серебряников!');
        }
    };

    const btnClose = document.createElement('button');
    btnClose.className = 'pixel-btn cancel';
    btnClose.textContent = 'Закрыть';
    btnClose.onclick = () => backdrop.remove();

    modal.append(title, img, desc, price, qtyLabel, qtyInput, btnBuy, btnClose);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
}

registerLocation('shop', loadShop);
