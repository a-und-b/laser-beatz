import { useContext, useEffect, useState } from 'react'
import { Box, Button, Fade, Grid, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router';
import { GlobalContext } from '../provider/GlobalProvider';
import { getUser } from '../api';
import { isEmpty } from 'lodash';
import ScanArea from '../shared/Other/ScanArea';


const ScanUser = () => {
  const theme = useTheme();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useContext(GlobalContext);
  const [isScanning, setIsScanning] = useState(false);

  const getUserByQRLinkAndRedirect = async (decodedText) => {
    const userId = decodedText.split("pioneers-of-tomorrow.de/")[1];
    const userData = await getUser(userId);
    setUser(userData);
    console.log('USER:', userData);
    if (userData.userName) {
      router.push('/main')
    } else {
      router.push('/userSettings')
    }
    return userData;
  };

  useEffect(() => {
    if (!isEmpty(user) && user.username) {
      router.push('/main');
    }

    setTimeout(() => setLoaded(true), 600);
  }, [isScanning, loaded, user])

  const startScanner = () => {
    setIsScanning(true);
  }

  const onScannedQRCode = async (decodedText) => {
    console.log('osqrc', decodedText);
    await getUserByQRLinkAndRedirect(decodedText);
  }

  return (
    <Fade in={loaded}>
      <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ color: theme.palette.primary.main, mb: 2 }}>Pioneers Pass aktivieren</Typography>
        <Typography sx={{ mb: 2 }}>Scanne den QR-Code auf der Vorderseite deines Pioneers Pass und lass das Abenteuer beginnen!</Typography>
        <Box sx={{ mb: 15, width: '100%' }}>
          <ScanArea {...{ isScanning, onScannedQRCode }} />
        </Box>
        <Box sx={{ py: 2, px: 2, display: 'flex', position: 'fixed', width: '100%', bottom: 0, left: 0, background: theme.palette.secondary.dark }}>
          <Button variant='contained' sx={{ mb: 1, width: '100%', color: theme.palette.secondary.main }} onClick={() => startScanner()}>
            Code scannen
          </Button>
        </Box>
      </Grid >
    </Fade>
  )
}

export default ScanUser
