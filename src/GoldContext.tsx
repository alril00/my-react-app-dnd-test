import React, { useState, ReactNode, createContext } from "react";

// Контекст в React (Context API) — это встроенный инструмент, который позволяет передавать данные из одного компонента в любой другой напрямую, минуя кучу промежуточных компонентов.

//Сам Контекст (Доска): Создается через функцию createContext(). Это просто декларация: «Здесь будут лежать такие-то данные».
// Провайдер (Поставщик): Компонент <Context.Provider>. Он оборачивает приложение и говорит: «Я управляю этой доской и гарантирую, что на ней всегда актуальная информация».
// Потребитель (Тот, кто смотрит на доску): С помощью хука useContext() любой компонент считывает данные с этой доски.


export const GoldContext = createContext<any>(undefined)
export const GoldProvider = ({ children }: { children: ReactNode }) => {
    const [gold, setGold] = useState(1500)
    const spendGold = (price: number) => {
        setGold(prev => prev - price)
    }

    return (
        <GoldContext.Provider value={{ gold, spendGold }}>
            {children}
        </GoldContext.Provider>
    )
}

//Что за children? Это значит, что GoldProvider — это как коробка, внутрь которой мы положим всё наше приложение (App). Всё, что окажется внутри этой коробки, автоматически получит доступ к золоту.
//: { children: ReactNode } — это просто капризы TypeScript. Мы обязаны объяснить ему, что внутрь этой коробки будут складываться обычные React-компоненты.