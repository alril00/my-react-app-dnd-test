import { useState, useEffect, useContext } from 'react';
import './App.css'
import './ProfileCard.css';
import CharacterForm from './CharacterForm.tsx';
import Wallet from './Wallet.tsx'
import { GoldContext, GoldProvider } from './GoldContext.tsx';
import { ThemeProvider, useTheme } from './ThemeContext.tsx';
import Inventory from './Inventory.tsx';
import Cart from './Cart.tsx';
import UseCounter from './Counter.tsx';
import Game from './Game.tsx'
import useLocalStorage from './Game.tsx'


/**
 * Считает общую стоимость товаров в корзине с учетом скидки.
 * * @param {number} price - Чистая цена товара.
 * @param {number} quantity - Количество предметов.
 * @param {number} discount - Процент скидки (от 0 до 100).
 * @returns {number} Итоговая стоимость, округленная до копеек.
 */
// function calculateTotal(price, quantity, discount) {
//   const total = price * quantity;
//   return total - (total * discount / 100);
// }

// interface RaceCardProps {
//   raceName: string;
//   description: string;
//   bonus: string;
//   onSelect: () => void;
// }

// function RaceCard(props: RaceCardProps) {
//   return (
//     <div className="card">
//       <ul>
//         <li>{props.raceName}</li>
//         <li>{props.description}</li>
//         <li>{props.bonus}</li>
//         <button onClick={props.onSelect}>Взять оружие</button>
//       </ul>
//     </div >
//   )
// }

// function ProfileCard(props: { name: string; title: string }) {
//   return (
//     <div className="profile-card">
//       <img className="avatar" alt="Аватар" />
//       <div className="info">
//         <h2>{props.name}</h2>
//         <p>{props.title}</p>
//       </div>
//     </div>
//   );
// }

// calculateTotal()
const classesList = [
  { id: '1', name: 'Воин', icon: '⚔️', description: 'Мастер ближнего боя и тяжелой брони' },
  { id: '2', name: 'Маг', icon: '🔮', description: 'Повелевает стихиями и читает древние заклинания' },
  { id: '3', name: 'Вор', icon: '🗡️', description: 'Специалист по скрытности, взлому и ядам' },
  { id: '4', name: 'Жрец', icon: '☀️', description: 'Исцеляет союзников и карает нежить светом' },
  { id: '5', name: 'Следопыт', icon: '🏹', description: 'Меткий стрелок и знаток дикой природы' },
  { id: '6', name: 'Бард', icon: '🪕', description: 'Вдохновляет песнями и забалтывает любого врага' }
]
const Layout = () => <div> <Page /> </div>
const Page = () => {
  const { gold, spendGold } = useContext(GoldContext)
  return (
    <div style={{ border: '2px dashed #8B4513', padding: '15px', borderRadius: '8px', background: '#FFF8DC' }}>
      <h3>🏪 Лавка торговца</h3>
      <p >💰 Твой кошелек: <strong style={{ color: 'gold' }}>{gold}</strong></p>
      <p>🗡️ Стальной меч — Цена: <span style={{ color: 'red' }}>30</span></p>

      <button onClick={() => spendGold(30)}>Купить меч </button>

    </div>
  )
}

const Header = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header>
      <span>Текущая тема: {theme}</span>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
      </button>
    </header>
  )
}



function App() {
  // const [gold, setGold] = useState(50)
  // const [weapon, setWeapon] = useState('')
  const [dice, setDice] = useState(0)
  const [heroName, setHeroName] = useState('')
  const [heroClass, setHeroClass] = useState('')
  // const [showComponent, setShowComponent] = useState(true)
  const [quest, setQuest] = useState('Ищу квесты на доске объявлений... 📜')
  // const [showTracker, setShowTracker] = useState(true)
  const [liked, setLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    const fetchQuestFromServer = async () => {
      try {
        const responce = await fetch('https://catfact.ninja/fact')
        const data = await responce.json()
        setQuest(`Слухи в таверне: ${data.fact} 🐾`)
      } catch (error) {
        setQuest('Доска объявлений пуста');
      }
    }

    fetchQuestFromServer()
  }, []) // Пустые скобки значат: «запустить один раз при старте»

  // useEffect(() => {
  //   const goldTimer = setInterval(() => {
  //     setGold(prevGold => prevGold - 1);
  //   }, 3000);
  //   return () => {
  //     clearInterval(goldTimer)
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log(`💰 Текущее количество золота: ${gold} 🪙`);
  // }, [gold]) // Этот эффект будет срабатывать каждый раз, когда изменяется значение gold

  // const ClickTracker = () => {
  //   useEffect(() => {
  //     const handleWindowClick = () => {
  //       console.log("💥 Клик зафиксирован во внешнем мире (window)!");
  //     }
  //     window.addEventListener('click', handleWindowClick)
  //     console.log("➕ Подписка оформлена!");

  //     return () => {
  //       window.removeEventListener('click', handleWindowClick)
  //       console.log("🧹 Очистка! Подписка удалена.");
  //     }
  //   }, [])

  //   return (
  //     <div>
  //       {/* 🕵️‍♂️ Я — компонент-следопыт. Пока я на экране, я слежу за кликами! */}
  //       👁️Я секретный элемент
  //     </div>
  //   )
  // }

  return (
    <>

      <Game />

      <UseCounter />

      <Cart />

      <hr />

      <Inventory />

      <hr />

      <ThemeProvider>
        <Header />
        <h1>Добро пожаловать в приложение!</h1>
      </ThemeProvider >

      <Wallet />

      <GoldProvider>
        <div
          style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}
        >
          <h2>🛡️ Панель Игрока</h2>
          <Layout />

        </div>
      </GoldProvider>



      <h1 className='main-title'>Создай своего героя!</h1>

      <CharacterForm />

      <div
        className={`chest-card ${isHovered ? 'highlighted' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}

        style={{ padding: '20px', border: '2px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}
      >
        <div style={{ fontSize: '40px' }}>
          {isHovered ? '🔓' : '🔒'}
        </div>

        <h3>Магический сундук</h3>

        {isHovered && <p style={{ color: 'gold' }}>✨ Внутри припрятано что-то ценное... ✨</p>}
      </div>

      <hr />

      <button
        className={`like-btn ${liked ? 'liked' : ''}`}
        onClick={() => setLiked(!liked)}
      >
        {liked ? '❤️Вы лайкнули' : '🤍 Поставить лайк'}
      </button>

      <hr />

      {/* <div>
        <button onClick={() => setShowTracker(!showTracker)}>{showTracker ? 'скрыть' : 'показать'}</button>
        {showTracker && <ClickTracker />}
      </div> */}

      {/* <div className="cards">
        <RaceCard
          raceName='Elf'
          description='Live in forest'
          bonus='+2 DEX'
          onSelect={() => setWeapon('Лук 🏹')}
        />

        <RaceCard
          raceName='Dvorf'
          description='Live in mountains'
          bonus='+2 MUS'
          onSelect={() => setWeapon('Молот🪓')}
        />

        <RaceCard
          raceName='Human'
          description='Most ambitious race'
          bonus='+2 all'
          onSelect={() => setWeapon('Меч ⚔️')}
        />

      </div>
      <h4>Твое текущее оружие: {weapon || 'Кулаки 👊'}</h4> */}

      <div className="class-selection">
        <h3>Выберите класс: {heroClass || 'Класс не выбран'}</h3>
        <div>
          {classesList.map((item) => (
            <div className='class-item'
              style={{
                border: heroClass === item.name ? '2px solid gold' : '2px solid gray'
              }}
              key={item.id}
              onClick={() => setHeroClass(item.name)}
            >
              <div>
                {item.icon} {item.name}
                <div>
                  {item.description}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div >

      {/* <h3>Твое стартовую золото: {gold} 🪙</h3> */}
      {/* <div className="buttons">
          <button
            onClick={() => setGold(gold + 5)}>
            Обыскать сундук (+5)
          </button>
          <button
            onClick={() => setGold(gold - 2)}>
            Купить эль (-2)
          </button>
        </div> */}

      <div className="dice">
        <button onClick={() => setDice(Math.floor(Math.random() * 20) + 1)}
          className='dice-button'
        >
          Бросить кубик <br /> на Удачу
        </button>
        <h2>{dice}</h2>
      </div>

      <div className="form-group">
        <label>Имя героя: </label>
        <input
          type="text"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
          placeholder='ur name'
        />
        <p>Ur name: {heroName || 'no name'}</p>
      </div>

      <div className="adventure-start">
        {heroName && heroClass ? (
          <div>
            <p>🎉 Персонаж полностью готов к походу!</p>
            <button onClick={() => alert('Приключение начинается!')}>
              Начать приключение</button>
          </div>
        ) : (
          <p /* style={{ color: 'white' }} */>Заполните имя и выберите класс, чтобы начать поход ⏳</p>
        )
        }
      </div>

      <hr />

      <div className='tavern'>
        <h3 style={{ margin: 0 }}> Доска объявлений в таверне🍻</h3>
        <p>{quest}</p>
      </div>

    </>
  )
}


export default App
