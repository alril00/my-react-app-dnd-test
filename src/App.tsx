import { useState } from 'react';
import './App.css'

interface RaceCardProps {
  raceName: string;
  description: string;
  bonus: string;
  onSelect: () => void;
}

function RaceCard(props: RaceCardProps) {
  return (
    <div className="card">
      <ul>
        <li>{props.raceName}</li>
        <li>{props.description}</li>
        <li>{props.bonus}</li>
        <button onClick={props.onSelect}>Взять оружие</button>
      </ul>
    </div >
  )
}
const classesList = [
  { id: '1', name: 'Воин', icon: '⚔️', description: 'Мастер ближнего боя и тяжелой брони' },
  { id: '2', name: 'Маг', icon: '🔮', description: 'Повелевает стихиями и читает древние заклинания' },
  { id: '3', name: 'Вор', icon: '🗡️', description: 'Специалист по скрытности, взлому и ядам' },
  { id: '4', name: 'Жрец', icon: '☀️', description: 'Исцеляет союзников и карает нежить светом' },
  { id: '5', name: 'Следопыт', icon: '🏹', description: 'Меткий стрелок и знаток дикой природы' },
  { id: '6', name: 'Бард', icon: '🪕', description: 'Вдохновляет песнями и забалтывает любого врага' }
]

function App() {
  const [gold, setGold] = useState(20)
  const [weapon, setWeapon] = useState('')
  const [dice, setDice] = useState(0)
  const [heroName, setHeroName] = useState('')
  const [heroClass, setHeroClass] = useState('')

  return (
    <>
      <h1 className='main-title'>Создай своего героя!</h1>
      <h3 className='main-subtitle'>Выбери для твоего приключения</h3>

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

      <div className="cards">
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


      <h3>Твое текущее оружие: {weapon || 'Кулаки 👊'}</h3>

      <h3>Твое стартовую золото: {gold} 🪙</h3>
      <div className="buttons">
        <button
          onClick={() => setGold(gold + 5)}>
          Обыскать сундук (+5)
        </button>
        <button
          onClick={() => setGold(gold - 2)}>
          Купить эль (-2)
        </button>
      </div>

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
          placeholder='ur name' />
        <p>Ur name: {heroName || 'no name'}</p>
      </div>
    </>
  )
}

export default App
