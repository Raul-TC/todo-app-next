'use client'
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

interface ThemeContextType {
    darkTheme: boolean,
    handleTheme: () => void;

}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [darkTheme, setDarkTheme] = useState<boolean>(false)

    const handleTheme = useCallback(() => {
        setDarkTheme(prevTheme => {
            const newTheme = !prevTheme
            localStorage.setItem('theme', newTheme.toString())
            document.documentElement.classList.toggle('dark', newTheme)
            return newTheme
        })
    }, [])

    useEffect(() => {
        if (localStorage.getItem('theme') === 'true') {
            setDarkTheme(true)
            document.documentElement.classList.add('dark')
        } else {
            setDarkTheme(false)
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const data = {
        darkTheme,
        handleTheme
    }
    return (
        <ThemeContext.Provider value={data}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext