import NextImage from 'next/image'
import { Box, Container, Fade, Link, useTheme } from '@mui/material'
import { useEffect, useState } from 'react';

const PageWrapper = ({ children }) => {
    const theme = useTheme();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 300);
    }, [loaded, theme.laserbeatzMode]);

    return (
        <Box sx={{ minHeight: '100vh', minWidth: '100vw' }}>
            <Container sx={{ minHeight: '100vh', maxWidth: 696 }}>
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: `url('/img/app-background.png')`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }} />
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
                    <Box sx={{ width: '100%', height: '100%', position: 'absolute', background: `linear-gradient(${theme.palette.secondary.main} 50%, transparent)` }} />
                    <Box sx={{ width: '100%', height: '100%', position: 'absolute', backdropFilter: 'blur(10px)', mask: 'linear-gradient(black, transparent)' }} />
                    <Box sx={{ mt: 4, mb: 4, position: 'relative', display: 'flex', height: 100, justifyContent: 'center', }}>
                        <Fade in={loaded}>
                            <Link href='/'>
                                <NextImage src={`/img/logo-${theme.laserbeatzMode}.svg`} layout='fill' />
                            </Link>
                        </Fade>
                    </Box>
                </Box>
                <Box sx={{ pt: 20 }}></Box>
                <Box sx={{ minHeight: '70vh' }}>
                    {children}
                </Box>
            </Container>
        </Box>
    )
}

export default PageWrapper;