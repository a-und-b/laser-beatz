import NextImage from 'next/image'
import { Box, Button, Container, Fade, Link, useTheme } from '@mui/material'
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import QuestionIcon from '../shared/Icons/Question';
import ScanIcon from '../shared/Icons/Scan';

const PageWrapper = ({ children }) => {
    const theme = useTheme();
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const hasMenu = router.asPath !== '/testingYeet/welcomeUser';
    // TODO: remove isRoot on go live
    const isRoot = router.asPath === '/';

    useEffect(() => {
        setTimeout(() => setLoaded(true), 300);
    }, [loaded, theme.laserbeatzMode]);

    return (
        <Box sx={{ minHeight: '100vh', minWidth: '100vw' }}>
            <Container sx={{ minHeight: '100vh', maxWidth: 696 }}>
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: `url('/img/app-background.svg')`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }} />
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
                    <Box sx={{ width: '100%', height: '100%', position: 'absolute', background: `linear-gradient(${theme.palette.secondary.main} 50%, transparent)` }} />
                    <Box sx={{ width: '100%', height: '100%', position: 'absolute', backdropFilter: 'blur(10px)', mask: 'linear-gradient(black, transparent)' }} />
                    <Box sx={{ mt: isRoot ? 10 : 4, mb: 4, position: 'relative', display: 'flex', height: isRoot ? 150 : 100, justifyContent: 'space-between', }}>
                        {
                            hasMenu &&
                            <Button href="/testingYeet/scan">
                                <ScanIcon />
                            </Button>
                        }
                        <Fade in={loaded}>
                            <Link href='/testingYeet'>
                                <NextImage src={`/img/logo-${theme.laserbeatzMode}.svg`} layout='fill' />
                            </Link>
                        </Fade>
                        {
                            hasMenu &&
                            <Button href="/testingYeet/welcomeUser">
                                <QuestionIcon />
                            </Button>
                        }
                    </Box>
                </Box>
                <Box sx={{ pt: isRoot ? 35 : 20 }}></Box>
                <Box sx={{ minHeight: '70vh' }}>
                    {children}
                </Box>
            </Container>
        </Box>
    )
}

export default PageWrapper;