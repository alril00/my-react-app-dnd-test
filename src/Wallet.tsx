import React, { useReducer } from 'react';

// 1. Описываем ТИПЫ данных для TypeScript (чтобы VS Code подсвечивал ошибки)
interface WalletState {
    gold: number;
    potions: number;
}

type WalletAction =
    | { type: 'GOLD_EARN'; payload: number }
    | { type: 'GOLD_SPEND'; payload: number }
    | { type: 'BUY_POTION'; payload: { cost: number } }
    | { type: 'RESET' };

// 2. Начальное состояние (Стартовый сундук)
const initialState: WalletState = {
    gold: 100,
    potions: 0
};

// 3. Функция-Редюсер (Гоблин-Казначей)
// Она строго изолирована от внешнего мира и просто меняет стейт по правилам
const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
    switch (action.type) {
        case 'GOLD_EARN':
            // Всегда возвращаем НОВЫЙ объект через ...state, не мутируя старый
            return { ...state, gold: state.gold + action.payload };

        case 'GOLD_SPEND':
            if (state.gold >= action.payload) {
                return { ...state, gold: state.gold - action.payload };
            }
            alert('❌ Не хватает золота!');
            return state; // Если золота мало, возвращаем стейт без изменений

        case 'BUY_POTION':
            if (state.gold >= action.payload.cost) {
                return {
                    ...state,
                    gold: state.gold - action.payload.cost,
                    potions: state.potions + 1
                };
            }
            alert('❌ Не хватает золота на зелье лечения!');
            return state;

        case 'RESET':
            return { gold: 0, potions: 0 };

        default:
            return state;
    }
};

// 4. Главный компонент интерфейса
export default function WalletApp() {
    // Подключаем редюсер: передаем функцию и начальный стейт
    // Получаем текущий state и метод dispatch для отправки "приказов"
    const [state, dispatch] = useReducer(walletReducer, initialState);

    return (
        <div
            style={{
                fontFamily: 'sans-serif',
                padding: '40px',
                maxWidth: '400px',
                margin: '20px auto',
                backgroundColor: '#1e1e24',
                color: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
            <h2 style={{ textAlign: 'center', color: '#f1c40f' }}>🎒 Инвентарь Персонажа</h2>

            {/* Отображаем текущие данные из стейта */}
            <div 
            style={{ fontSize: '18px',
                 margin: '20px 0',
                  borderBottom: '1px solid #444', 
                  paddingBottom: '15px' 
                }}>
                <p>💰 Золото в кошельке: <strong style={{ color: '#f1c40f' }}>{state.gold}g</strong></p>
                <p>🧪 Зелья лечения: <strong style={{ color: '#2ecc71' }}>{state.potions} шт.</strong></p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                {/* Кнопка отправляет экшен с простым числом в payload */}
                <button
                    onClick={() => dispatch({ type: 'GOLD_EARN', payload: 50 })}
                    style={buttonStyle('#2ecc71')}
                >
                    ⚔️ Выполнить квест (+50g)
                </button>

                <button
                    onClick={() => dispatch({ type: 'GOLD_SPEND', payload: 20 })}
                    style={buttonStyle('#e74c3c')}
                >
                    🍺 Пропить в таверне (-20g)
                </button>

                {/* Кнопка отправляет сложный объект в payload */}
                <button
                    onClick={() => dispatch({ type: 'BUY_POTION', payload: { cost: 40 } })}
                    style={buttonStyle('#3498db')}
                >
                    🛒 Купить зелье у торговца (-40g)
                </button>

                {/* Кнопка отправляет экшен вообще без payload (только тип) */}
                <button
                    onClick={() => dispatch({ type: 'RESET' })}
                    style={{ ...buttonStyle('#7f8c8d'), marginTop: '15px' }}
                >
                    💀 Ограбление века (Сброс всего)
                </button>

            </div>
        </div>
    );
}

// Вспомогательная функция для стилизации кнопок (чтобы код был чище)
const buttonStyle = (color: string) => ({
    backgroundColor: color,
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    transition: 'opacity 0.2s',
});