import { Alert, Snackbar, ThemeProvider } from '@mui/material'
import { createLaserbeatzTheme, emerald, getPrimaryColor } from '../lib/theme'
import { createContext, useEffect, useState } from 'react'

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const defaultTheme = createLaserbeatzTheme(emerald);
    const [theme, setTheme] = useState(defaultTheme);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertText, setAlertText] = useState('');
    const showAlert = (text) => {
        setIsAlertOpen(true);
        setAlertText(text);
        setTimeout(() => {
            setIsAlertOpen(false);
        }, 6000);
    }

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
        <GlobalContext.Provider value={{ theme, setTheme, user, setUser, showAlert }}>
            <ThemeProvider theme={theme}>
                {children}
                <Snackbar open={isAlertOpen}>
                    <Alert severity="error" sx={{ width: '100%', fontSize: 24 }}>
                        {alertText}
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        </GlobalContext.Provider>
    )
}
export default GlobalProvider