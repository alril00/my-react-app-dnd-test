import React, {  useReducer } from "react";

// 1. Из чего состоит один предмет?

interface Item {
    id: number;      // Уникальный номер (чтобы не перепутать два одинаковых зелья)
    name: string;    // Название (например, "Ржавый меч")
    type: 'potion' | 'weapon'; // Строго два типа: либо зелье, либо оружие
    effect: string;  // Описание эффекта
}

// 2. Как выглядит весь наш стейт (состояние)?
interface InventoryState {
    items: Item[];   // Это массив предметов (наш рюкзак)
    hp: number;      // Текущее здоровье героя
    maxHp: number;   // Максимальное здоровье
}

const initialState: InventoryState = {
    //Закинем герою в рюкзак два стартовых предмета и сделаем его раненым (50 HP из 100).
    items: [
        { id: 1, name: 'Малое зелье лечения', type: 'potion', effect: '+20 HP' },
        { id: 2, name: 'Ржавый меч', type: 'weapon', effect: '+5 к атаке' },
    ],
    hp: 50,
    maxHp: 100,
}

//Редюсер — это функция, которая сидит внутри рюкзака и выполняет команды. Она принимает текущий стейт, смотрит на команду (action.type) и возвращает новый стейт.
const inventoryReducer = (
    state: InventoryState,
    action: InventoryAction): InventoryState => {
    switch (action.type) {
        // ЭКШЕН 1: Добавить предмет в рюкзак
        case 'ADD_ITEM':
            return {
                ...state, // 1. Копируем здоровье и остальные данные героя
                items: [...state.items, action.payload] // 2. Берем старый рюкзак и дописываем в конец новый предмет
            }
        // ЭКШЕН 2: Выкинуть предмет из рюкзака
        case 'REMOVE_ITEM':
            return {
                ...state,
                // Оставляем в рюкзаке только те вещи, чей ID не равен выкинутому
                items: state.items.filter(item => item.id !== action.payload)
            };
        // ЭКШЕН 3: Использовать (выпить) зелье
        case 'USE_ITEM': {
            // Находим предмет, который хотим использовать
            const itemToUse = state.items.find(item => item.id === action.payload);
            if (!itemToUse) return state;
            // Если это оружие — пить его нельзя!
            if (itemToUse.type === 'weapon') {
                alert(`⚔️ Вы не можете выпить ${itemToUse.name}!`);
                return state;
            }
            // Если это зелье — лечим героя (но не выше максимального HP)
            const newHp = Math.min(state.hp + 20, state.maxHp);
            return {
                ...state,
                hp: newHp,
                // Удаляем использованное зелье из рюкзака
                items: state.items.filter(item => item.id !== action.payload)
            };
        }

        default:
            return state;
    }
}


export default function InventoryApp() {
  // Подключаем наш мозг к компоненту
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  return (
    <div>
      {/* Выводим здоровье на экран */}
      <p>❤️ Здоровье: {state.hp} / {state.maxHp}</p>

      {/* Перебираем массив предметов и для каждого рисуем строчку с кнопками */}
      {state.items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          
          {/* Кнопка Использовать отправляет команду USE_ITEM и ID этого конкретного предмета */}
          <button onClick={() => dispatch({ type: 'USE_ITEM', payload: item.id })}>
            Использовать
          </button>
          
          {/* Кнопка Выкинуть отправляет команду REMOVE_ITEM */}
          <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
            Выкинуть
          </button>
        </div>
      ))}
    </div>
  );
}