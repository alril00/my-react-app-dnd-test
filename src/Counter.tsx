import React, { useState } from 'react';

// ========================================================
// 1. НАШ КАСТОМНЫЙ ХУК (useCounter)
// Он берет на себя всю математику. Принимает старт и шаг.
// ========================================================
function useCounter(initialValue = 0, step = 1) {
    const [count, setCount] = useState(initialValue);

    // Прибавляем переданный шаг
    const increment = () => setCount((prev) => prev + step);

    // Вычитаем переданный шаг
    const decrement = () => setCount((prev) => prev - step);

    // Сбрасываем в начальное значение
    const reset = () => setCount(initialValue);

    // Возвращаем объект с переменной и функциями наружу
    return { count, increment, decrement, reset };
}
// 2. НАШ КОМПОНЕНТ (Интерфейс приложения)
export default function CounterApp() {
    // Счетчик №1: стартует с 0, шаг равен 1 (по умолчанию)
    const counterOne = useCounter(0, 2);

    // Счетчик №2: стартует с 100, шаг равен 10
    const counterTwo = useCounter(100, 50);

    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                padding: '20px',
                maxWidth: '400px',
                margin: '0 auto'
            }}>
            <h2
                style={{ textAlign: 'center' }}>Кастомный хук useCounter</h2>

            {/* БЛОК ПЕРВОГО СЧЕТЧИКА */}
            <div style={boxStyle}>
                <h3>Счетчик А (Шаг: 1)</h3>
                <h1 style={numberStyle}>{counterOne.count}</h1>
                <div style={buttonGroupStyle}>
                    <button onClick={counterOne.decrement} style={btnStyle}>-1</button>
                    <button onClick={counterOne.reset} style={resetBtnStyle}>Сброс</button>
                    <button onClick={counterOne.increment} style={btnStyle}>+1</button>
                </div>
            </div>

            {/* БЛОК ВТОРОГО СЧЕТЧИКА */}
            <div style={{ ...boxStyle, backgroundColor: '#e8f8f5' }}>
                <h3>Счетчик Б (Шаг: 10)</h3>
                <h1
                    style={{ ...numberStyle, color: '#16a085' }}>{counterTwo.count}
                </h1>
                <div style={buttonGroupStyle}>
                    <button
                        onClick={counterTwo.decrement}
                        style={{ ...btnStyle, backgroundColor: '#16a085' }}>
                        - 50
                        

                    </button>
                    <button
                        onClick={counterTwo.reset}
                        style={resetBtnStyle}>
                        Сброс
                    </button>
                    <button
                        onClick={counterTwo.increment}
                        style={{ ...btnStyle, backgroundColor: '#16a085' }}>
                        +50
                    </button>
                </div>
            </div>
        </div>
    );
}


const boxStyle = {
    backgroundColor: '#f4f6f7',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const numberStyle = {
    fontSize: '42px',
    margin: '10px 0',
    color: '#2c3e50'
};

const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center'
};

const btnStyle = {
    padding: '8px 15px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const resetBtnStyle = {
    ...btnStyle,
    backgroundColor: '#7f8c8d'
};