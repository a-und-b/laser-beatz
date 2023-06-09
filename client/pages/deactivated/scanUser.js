import { useContext, useEffect, useState } from 'react'
import { Box, Button, Fade, Grid, TextField, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router';
import { GlobalContext } from '../provider/GlobalProvider';
import { getUser } from '../api';
import { isEmpty } from 'lodash';
import ScanArea from '../shared/Other/ScanArea';


const ScanUser = () => {
  const theme = useTheme();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { user, setUser, showAlert } = useContext(GlobalContext);
  const [isScanning, setIsScanning] = useState(false);
  const [input, setInput] = useState('');

  const getUserByQRLinkAndRedirect = async (decodedText) => {
    try {
      const userId = decodedText.split("pioneers-of-tomorrow.de/")[1];
      const userData = await getUser(userId);
      setUser(userData);
      console.log('USER:', userData);
      if (userData.userName) {
        router.push('/main');
      } else {
        router.push('/userSettings');
      }
      return userData;
    } catch (error) {
      showAlert('Kein Nutzer gefunden. Richtiger Code gescannt?');
    }
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

  const submit = async () => {
    try {
      const userData = await getUser(input);

      setUser(userData);
      if (userData.userName) {
        router.push('/main');
      } else {
        router.push('/userSettings');
      }
    } catch (error) {
      showAlert('Kein Nutzer gefunden. Hast du die richtige ID eingegeben?');
    }
  }

  return (
    <Fade in={loaded}>
      <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ color: theme.palette.primary.main, mb: 2 }}>Pioneers Pass aktivieren</Typography>
        <Typography sx={{ mb: 2 }}>Scanne den QR-Code auf der Vorderseite deines Pioneers Pass und lass das Abenteuer beginnen!</Typography>
        <Box sx={{ mb: 2, width: '100%' }}>
          <ScanArea {...{ isScanning, onScannedQRCode }} />
        </Box>
        <Box sx={{ py: 2, px: 2, display: 'flex', width: '100%', bottom: 0, left: 0, background: theme.palette.secondary.dark }}>
          <Button variant='contained' sx={{ mb: 1, width: '100%', color: theme.palette.secondary.main }} onClick={() => startScanner()}>
            Code scannen
          </Button>
        </Box>
        <Typography sx={{ mt: 4, mb: 2 }}>Klappt der QR-Code nicht? Gib deine Nutzerkennung hier ein:</Typography>
        <TextField
          onChange={(event) => setInput(event.target.value)}
          variant="outlined"
          value={input}
          sx={{
            width: '100%',
            mb: 2,
            textTransform: 'uppercase',

            'input': {
              textTransform: 'uppercase',
            },

            'fieldset': {
              border: `1px dashed ${theme.palette.primary.main}`,
              borderRadius: '5px',
            }
          }}
        />
        <Button variant='contained' sx={{ mb: 5, width: '100%', color: theme.palette.secondary.main }} onClick={() => submit()}>
          Einloggen
        </Button>
      </Grid>
    </Fade>
  )
}

export default ScanUser
