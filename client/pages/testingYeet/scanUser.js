import { useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, Container, Fade, Grid, Typography, useTheme } from '@mui/material'
import NextImage from 'next/image'
import { useRouter } from 'next/router';
import { GlobalContext } from '../../provider/GlobalProvider';
import { getUser } from '../../api';
import { isEmpty } from 'lodash';
import Scanner from '../../shared/Other/Scanner';
import ScanPlaceholder from '../../shared/Other/ScanPlaceholder';


const ScanUser = () => {
  const theme = useTheme();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useContext(GlobalContext);
  const [isScanning, setIsScanning] = useState(false);

  const getUserByQRLinkAndRedirect = async (decodedText = 'http://pioneers-of-tomorrow.de/n9okhm5k') => {
    const userId = decodedText.split("pioneers-of-tomorrow.de/")[1];
    // alert('Fetch user:', userId);
    const userData = await getUser(userId);
    setUser(userData);
    if (userData.userName) {
      router.push('/testingYeet')
    } else {
      router.push('/testingYeet/userSettings')
    }
    return userData;
  };

  useEffect(() => {
    if (!isEmpty(user) && user.username) {
      router.push('/testingYeet');
    }

    setTimeout(() => setLoaded(true), 600);
  }, [isScanning, loaded, user])

  const startScanner = () => {
    setIsScanning(true);
  }

  const onScannedQRCode = async (decodedText) => {
    console.log('osqrc', decodedText);
    // alert('Read:', decodedText);
    await getUserByQRLinkAndRedirect(decodedText);
  }

  return (
    <Fade in={loaded}>
      <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ color: theme.palette.primary.main, mb: 2 }}>Pioneers Pass aktivieren</Typography>
        <Typography sx={{ mb: 2 }}>Scanne den Qr-Code auf deinem Ticket euch den Pioneers of Tomorrow an und erlebt ein Abenteuer voller die Zukunft, von der ihr träumt.</Typography>
        <Box sx={{ mb: 2, width: '100%' }}>
          {
            isScanning
              ? (
                <Scanner isScanning={isScanning} onScannedQRCode={onScannedQRCode}/>
              )
              : (
                <ScanPlaceholder fill={theme.palette.primary.main} />
              )
          }
        </Box>
        <Button variant='contained' sx={{ width: '100%', color: theme.palette.secondary.main }} onClick={() => startScanner()}>
          Code scannen
        </Button>
      </Grid >
    </Fade>
  )
}

export default ScanUser
