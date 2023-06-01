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
    // TODO: remove isRoot on go live
    const isRoot = router.asPath === '/';
    const hasMenu = router.asPath !== '/' && router.asPath !== '/welcomeUser' && router.asPath !== '/scanUser';

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
                            <Button href="/main" sx={{ zIndex: 1 }}>
                                <ScanIcon fill={theme.palette.primary.main} />
                            </Button>
                        }
                        {/* <Fade in={loaded}> */}
                            {/* <Link href=''> */}
                                <NextImage src={`/img/logo-${theme.laserbeatzMode}.svg`} layout='fill' />
                            {/* </Link> */}
                        {/* </Fade> */}
                        {
                            hasMenu &&
                            <Button href="/welcomeUser" sx={{ zIndex: 1 }}>
                                <QuestionIcon fill={theme.palette.primary.main} />
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