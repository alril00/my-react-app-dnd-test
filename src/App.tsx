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

function App() {

  const [gold, setGold] = useState(20)
  const [weapon, setWeapon] = useState('')
  const [dice, setDice] = useState(0)

  return (
    <>
      <h1 className='main-title'>Создай своего героя!</h1>
      <h3 className='main-subtitle'>Выбери для твоего приключения</h3>

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
    </>
  )
}

export default App
