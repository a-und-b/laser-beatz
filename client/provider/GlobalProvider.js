import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import { createLaserbeatzTheme, emerald } from '../lib/theme'
import UserProvider from './UserProvider'
import { createContext, useEffect, useState } from 'react'

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const defaultTheme = createLaserbeatzTheme(user?.theme || emerald);
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        const stringifiedUser = localStorage.getItem('laserbeatz-user');

        if (stringifiedUser) {
            const parsedUser = JSON.parse(stringifiedUser);
            setUser(parsedUser);
        }
    }, []);

    return (
        <GlobalContext.Provider value={[theme, setTheme, user, setUser]}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </GlobalContext.Provider>
    )
}
export default GlobalProvider