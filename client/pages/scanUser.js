import { useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, Container, Fade, Grid, Typography, useTheme } from '@mui/material'
import { Html5Qrcode } from "html5-qrcode";
import NextImage from 'next/image'
import { useRouter } from 'next/router';
import { GlobalContext } from '../provider/GlobalProvider';
import { getUser } from '../api';
import { isEmpty } from 'lodash';


const ScanUser = () => {
  const theme = useTheme();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useContext(GlobalContext);
  const [isScanning, setIsScanning] = useState(false);

  const getUserByQRLinkAndRedirect = async (decodedText = 'http://pioneers-of-tomorrow.de/n9okhm5k') => {
    const userId = decodedText.split("http://pioneers-of-tomorrow.de/")[1];
    const userData = await getUser(userId);
    console.log('USER DATA', userData);
    setUser(userData);
    if (userData.userName) {
      router.push('/')
    } else {
      router.push('/userSettings')
    }
    return userData;
  };

  useEffect(() => {
    console.log('eff', user);
    if (!isEmpty(user)) {
      router.push('/');
    }

    setTimeout(() => setLoaded(true), 600);

    if (isScanning) {
      const video = document.getElementById('reader');
      console.log('VIDEO', video);

      const html5Qrcode = new Html5Qrcode('reader', true);

      console.log('INSTANCE', html5Qrcode);

      Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
          var cameraId = devices[devices.length === 2 ? 1 : 0].id;

          html5Qrcode.start(
            cameraId,
            {
              fps: 10,    // Optional, frame per seconds for qr code scanning
              qrbox: { width: 250, height: 500 }  // Optional, if you want bounded box UI
            },
            async (decodedText, decodedResult) => {
              await getUserByQRLinkAndRedirect(decodedText);
              html5Qrcode.stop();
            },
            (errorMessage) => {
              // ERROR IS THROWN WHEN NO BARCODE IS FOUND
            })
            .catch((err) => {
              console.log('ERR', err)
            });
        }
      }).catch(err => {
        // handle err
      });
    }
  }, [isScanning, loaded, user])

  const startScanner = () => {
    setIsScanning(true);
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
                <div id='reader' style={{
                  height: '30vh', width: '100%', position: 'relative',
                }} />
              )
              : (
                <NextImage src={'/img/scan.svg'} width="600" height="369" />
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
