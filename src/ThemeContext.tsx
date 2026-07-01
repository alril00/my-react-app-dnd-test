import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    /** Текст, который будет отображаться внутри кнопки */
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`app-wrapper ${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)

