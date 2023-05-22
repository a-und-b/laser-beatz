import { ThemeProvider } from '@mui/material'
import { createLaserbeatzTheme, emerald, getPrimaryColor } from '../lib/theme'
import { createContext, useEffect, useState } from 'react'

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const defaultTheme = createLaserbeatzTheme(emerald);
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        const stringifiedUser = localStorage.getItem('laserbeatz-user');

        if (stringifiedUser) {
            const parsedUser = JSON.parse(stringifiedUser);
            setUser(parsedUser);

            if (parsedUser.theme) {
                setTheme(createLaserbeatzTheme(getPrimaryColor(parsedUser.theme)))
            }
        }
    }, []);

    return (
        <GlobalContext.Provider value={{theme, setTheme, user, setUser}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </GlobalContext.Provider>
    )
}
export default GlobalProvider