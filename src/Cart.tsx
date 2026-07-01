import { useReducer } from 'react';


// 1. НАЧАЛЬНОЕ СОСТОЯНИЕ (Корзина изначально пустая)
const initialCartState = { items: [] };

// 2. РЕДЮСЕР КОРЗИНЫ (Вся бизнес-логика здесь)
function cartReducer(state: any, action: any) {
  switch (action.type) {

    // Операция 1: ДОБАВЛЕНИЕ ТОВАРА
    case 'ADD_ITEM': {
      // Ищем, есть ли уже этот товар в корзине
      const existingItem = state.items.find((item: { id: any; }) => item.id === action.payload.id);

      if (existingItem) {
        // Если нашли — увеличиваем его количество на +1
        return {
          ...state,
          items: state.items.map((item: { id: any; quantity: number }) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      // Если товара еще нет в корзине — добавляем его со стартовым количеством 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }

    // Операция 2: УДАЛЕНИЕ ТОВАРА
    case 'REMOVE_ITEM':
      return {
        ...state,
        // Оставляем только те товары, ID которых НЕ совпадает с удаляемым
        items: state.items.filter((item: { id: any; }) => item.id !== action.payload)
      };

    // Операция 3: ИЗМЕНЕНИЕ КОЛИЧЕСТВА (Плюс / Минус кнопки)
    case 'SET_QUANTITY':
      return {
        ...state,
        items: state.items.map((item: { id: any; quantity: number }) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) } // Не даем упасть ниже 1
            : item
        )
      };

    default:
      return state;
  }
}


// 3. КОМПОНЕНТ ПРИЛОЖЕНИЯ (Интерфейс)
export default function CartApp() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Список товаров на нашей "витрине" магазина
  const shopProducts = [
    { id: 101, name: '⚔️ Стальной Меч', price: 500 },
    { id: 102, name: '🧪 Зелье Маны', price: 150 },
  ];

  // Считаем общую сумму всех товаров в корзине для наглядности
  const totalCartPrice = state.items.reduce((sum: number, item: { price: number; quantity: number }) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '500px', margin: '0 auto' }}>

      {/* ВИТРИНА МАГАЗИНА */}
      <h3 style={{ borderBottom: '2px solid #34495e', paddingBottom: '5px' }}>🛒 Витрина лавки</h3>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        {shopProducts.map((product: { id: number; name: string; price: number }) => (
          <div key={product.id} style={productCardStyle}>
            <h4>{product.name}</h4>
            <p>{product.price} золотых</p>
            <button
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
              style={addBtnStyle}
            >
              В корзину
            </button>
          </div>
        ))}
      </div>

      {/* СОДЕРЖИМОЕ КОРЗИНЫ */}
      <h3 style={{ borderBottom: '2px solid #34495e', paddingBottom: '5px' }}>🛍️ Твоя Корзина</h3>

      {state.items.length === 0 ? (
        <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>Корзина пуста. Купи что-нибудь у торговца!</p>
      ) : (
        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {state.items.map((item: { id: any; name: string; price: number; quantity: number }) => (
              <li key={item.id} style={cartItemStyle}>
                <div>
                  <strong>{item.name}</strong>
                  <br />
                  <small style={{ color: '#7f8c8d' }}>{item.price} золотых х {item.quantity}</small>
                </div>

                {/* Кнопки управления количеством и удалением */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => dispatch({ type: 'SET_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                    style={actionBtnStyle}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button
                    onClick={() => dispatch({ type: 'SET_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                    style={actionBtnStyle}
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                    style={deleteBtnStyle}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* ИТОГОВАЯ СУММА */}
          <div style={{ textAlign: 'right', marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
            Итого: <span style={{ color: '#e67e22' }}>{totalCartPrice} золотых</span>
          </div>
        </div>
      )}
    </div>
  );
}

const productCardStyle = {
  border: '1px solid #bdc3c7',
  padding: '15px',
  borderRadius: '8px',
  flex: 1,
  textAlign: 'center',
  backgroundColor: '#f9f9f9'
};

const addBtnStyle = {
  backgroundColor: '#2ecc71',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const cartItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#ecf0f1',
  padding: '12px',
  borderRadius: '6px',
  marginBottom: '10px'
};

const actionBtnStyle = {
  width: '28px',
  height: '28px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px'
};

const deleteBtnStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  marginLeft: '10px'
};