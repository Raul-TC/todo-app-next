import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export const useThemeProvider = () => {
    const data = useContext(ThemeContext)

    if (data === undefined) {
        throw new Error('useMyContext debe ser usado dentro de un MyProvider');
    }
    const { darkTheme, handleTheme } = data
    return { darkTheme, handleTheme }
}