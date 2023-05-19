import '../styles/globals.css'
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../lib/theme'
import App from 'next/app'
import NextImage from 'next/image'
import GlobalProvider from '../provider/GlobalProvider'

function MyApp({
  Component, pageProps, globalContext
}) {
  return (
    <GlobalProvider data={globalContext}>
      <CssBaseline />
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
            <Component {...pageProps} />
          </Box>
        </Container>
      </Box>
    </GlobalProvider>
  )

}

MyApp.getInitialProps = async (appContext) => {

  const [appProps] = await Promise.all(
    [
      App.getInitialProps(appContext),
    ])

  return {
    ...appProps,
    globalContext: { user: {} },
  }
}

export default MyApp
