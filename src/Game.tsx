import  { useState, useEffect, useMemo } from 'react';

// ==========================================
// 1. НАШ КАСТОМНЫЙ ХУК (Сейф браузера)
// ==========================================
function useLocalStorage(key, initialValue) {
  // При старте проверяем сейф. Если там что-то есть — берём, если нет — ставим начальное значение
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  // Как только value меняется — автоматически записываем его в сейф
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// ==========================================
// 2. КОМПОНЕНТ ИГРЫ
// ==========================================
export default function Game() {
  // Создаём стейт для героя через наш сейф-хук
  const [hero, setHero] = useLocalStorage('hero_save', {
    gold: 100,
    items: ['Меч', 'Щит', 'Зелье', 'Шлем', 'Сапоги']
  });

  // Обычный стейт для строки поиска (его в сейф сохранять не нужно)
  const [search, setSearch] = useState('');

  // Функция добавления золота
  const addGold = () => {
    setHero({ ...hero, gold: hero.gold + 50 });
  };
  const removeGold = () => {
    setHero({ ...hero, gold: hero.gold - 50 });
  }

  // ОПТИМИЗАЦИЯ: Фильтруем рюкзак через useMemo
  const filteredItems = useMemo(() => {
    console.log('🔮 useMemo сработал! Перебираю рюкзак...');
    return hero.items.filter(item => 
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [hero.items, search]); // Пересчитывать, только если изменились вещи или поиск!

  return (
    <div style={{ padding: '20px', fontSize: '18px' }}>
      <h2>📜 Прогресс Героя</h2>
      
      {/* ЗОЛОТО */}
      <p>💰 Золото: <b>{hero.gold}</b></p>
      <button onClick={addGold}>Заработать +50 золота</button>
      <button onClick={removeGold}>Потратить 50 золота</button>

      <hr />

      {/* ПОИСК И РЮКЗАК */}
      <h3>🎒 Рюкзак</h3>
      <input 
        type="text" 
        placeholder="Поиск вещи..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />

      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p style={{ fontSize: '14px', color: 'gray' }}>
        *Открой консоль (F12) и поклацай кнопки, чтобы увидеть магию useMemo. А потом нажми F5 (перезагрузку) — золото останется!
      </p>
    </div>
  );
}