import NextImage from 'next/image'
import { Box, Container, useTheme } from '@mui/material'

const PageWrapper = ({ children }) => {
    const theme = useTheme();

    return (
        <Box sx={{ minHeight: '100vh', minWidth: '100vw' }}>
            <Container sx={{ minHeight: '100vh' }}>
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: `url('/img/app-background.png')`, backgroundSize: 'cover', zIndex: -1 }} />
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
                    <Box sx={{ width: '100%', height: '100%', position: 'absolute', background: `linear-gradient(${theme.palette.secondary.main} 50%, transparent)` }} />
                    <Box sx={{ width: '100%', height: '100%', position: 'absolute', backdropFilter: 'blur(10px)', mask: 'linear-gradient(black, transparent)' }} />
                    <Box sx={{ mt: 4, mb: 10, position: 'relative', display: 'flex', height: 100, justifyContent: 'center', }}>
                        <NextImage src='/img/logo.svg' layout='fill' />
                    </Box>
                </Box>
                <Box sx={{ pt: 25 }}></Box>
                <Box sx={{ minHeight: '70vh' }}>
                    {children}
                </Box>
            </Container>
        </Box>
    )
}

export default PageWrapper;