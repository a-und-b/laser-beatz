import { ThemeProvider } from '@mui/material'
import theme from '../lib/theme'
import UserProvider from './UserProvider'

const GlobalProvider = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                {children}
            </UserProvider>
        </ThemeProvider>
    )
}
export default GlobalProvider