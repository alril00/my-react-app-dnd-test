// import { useState } from "react";

// function CharacterForm() {

//     const [name, setName] = useState('');
//     const [characterClass, setCharacterClass] = useState('');

//     const [errors, setErrors] = useState<any>({});

//     const validateForm = () => {
//         let tempErrors: any = {}; // Временный мешок для сбора ошибок

//         if (name === '') {
//             tempErrors.name = 'Имя не может быть пустым!';
//         }
//         if (characterClass === '') {
//             tempErrors.characterClass = 'Выберите класс!';
//         }

//         setErrors(tempErrors); // Переносим собранные ошибки в стейт
//         // Если мешок пустой — значит ошибок нет, возвращаем true
//         return Object.keys(tempErrors).length === 0;
//     };

//     const handleSubmit = () => {
//         if (validateForm()) {
//             alert('Ура, ошибок нет! Герой создан.');
//         }
//     };



//     return (
//         <div style={{ margin: '30px' }}>

//             <input 
//                 value={name} 
//                 onChange={e => setName(e.target.value)} 
//                 placeholder="Имя героя" 
//             />

//             {errors.name && 
//             <p style={{ color: 'red' }}>{errors.name}</p>}

//             {/* Инпут Класса */}
//             <input 
//                 value={characterClass} 
//                 onChange={e => setCharacterClass(e.target.value)} 
//                 placeholder="Класс (Маг/Воин)" 
//             />
//             {/* Ошибка для Класса */}
//             {errors.characterClass && 
//             <p style={{ color: 'red' }}>{errors.characterClass}</p>}

//             <button onClick={handleSubmit}>Создать героя</button>
//         </div>
//     );
// }

// export default CharacterForm;



import React, { useState } from 'react';

export default function CharacterForm() {
    // 1. Сложный вложенный стейт персонажа
    const [form, setForm] = useState({
        characterName: 'Гэндальф',
        stats: {
            strength: 10,
            agility: 15,
            intelligence: 20
        }
    });

    // 2. Универсальный обработчик со спредом и вычисляемыми свойствами
    const handleStatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target; // name берется из атрибута инпута, value - то, что ввели

        setForm(prev => ({
            ...prev, // 1-й спред: копируем верхний уровень (имя 'Гэндальф' не сотрется)
            stats: {
                ...prev.stats, // 2-й спред: копируем старые характеристики (остальные не сотрутся)
                [name]: Number(value) // Вычисляемое свойство: динамически меняем ключ (например, strength)
            }
        }));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px' }}>
            <h2>Лист Персонажа</h2>

            <p><strong>Имя:</strong> {form.characterName}</p>

            <hr />

            {/* Инпуты. Важно: name совпадает с ключами в stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label>
                    Сила (strength):
                    <input
                        type="number"
                        name="strength"
                        value={form.stats.strength}
                        onChange={handleStatChange}
                        style={{ marginLeft: '10px' }}
                    />
                </label>

                <label>
                    Ловкость (agility):
                    <input
                        type="number"
                        name="agility"
                        value={form.stats.agility}
                        onChange={handleStatChange}
                        style={{ marginLeft: '10px' }}
                    />
                </label>

                <label>
                    Интеллект (intelligence):
                    <input
                        type="number"
                        name="intelligence"
                        value={form.stats.intelligence}
                        onChange={handleStatChange}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>

            <hr />

            {/* Секция для визуализации стейта Мастера в реальном времени */}
            <h3 style={{ marginTop: '20px' }}>Текущий стейт в памяти React:</h3>
            <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
                {JSON.stringify(form, null, 2)}
            </pre>
        </div>
    );
}