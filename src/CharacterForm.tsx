import { useState } from "react";

function CharacterForm() {

    const [name, setName] = useState('');
    const [characterClass, setCharacterClass] = useState('');

    const [errors, setErrors] = useState<any>({});

    const validateForm = () => {
        let tempErrors: any = {}; // Временный мешок для сбора ошибок

        if (name === '') {
            tempErrors.name = 'Имя не может быть пустым!';
        }
        if (characterClass === '') {
            tempErrors.characterClass = 'Выберите класс!';
        }

        setErrors(tempErrors); // Переносим собранные ошибки в стейт
        // Если мешок пустой — значит ошибок нет, возвращаем true
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            alert('Ура, ошибок нет! Герой создан.');
        }
    };

    

    return (
        <div style={{ margin: '30px' }}>
           
            <input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Имя героя" 
            />
            
            {errors.name && 
            <p style={{ color: 'red' }}>{errors.name}</p>}

            {/* Инпут Класса */}
            <input 
                value={characterClass} 
                onChange={e => setCharacterClass(e.target.value)} 
                placeholder="Класс (Маг/Воин)" 
            />
            {/* Ошибка для Класса */}
            {errors.characterClass && 
            <p style={{ color: 'red' }}>{errors.characterClass}</p>}

            <button onClick={handleSubmit}>Создать героя</button>
        </div>
    );
}

export default CharacterForm;