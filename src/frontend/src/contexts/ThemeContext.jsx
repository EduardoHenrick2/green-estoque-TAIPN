import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Modo Claro será o padrão inicial, a menos que o usuário já tenha salvo 'dark'
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('greenvolt_theme');
        return saved || 'light';
    });

    useEffect(() => {
        // Atualiza o atributo no <html> para o CSS ler
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('greenvolt_theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
