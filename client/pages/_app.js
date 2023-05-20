import '../styles/globals.css'
import { CssBaseline } from '@mui/material'
import App from 'next/app'
import GlobalProvider from '../provider/GlobalProvider'
import PageWrapper from '../globals/PageWrapper'

function MyApp({
  Component, pageProps
}) {
  return (
    <GlobalProvider>
      <CssBaseline />
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </GlobalProvider>
  )

}

MyApp.getInitialProps = async (appContext) => {
  const [appProps] = await Promise.all(
    [
      App.getInitialProps(appContext),
    ]
  );

  return {
    ...appProps,
  }
}

export default MyApp
