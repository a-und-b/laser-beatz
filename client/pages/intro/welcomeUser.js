import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { UserContext } from "../../provider/UserProvider";

const WelcomeUser = () => {
    const theme = useTheme();
    const [user] = useContext(UserContext);

    console.log('WECOME USER', user);

    useEffect(() => {
      console.log('eff', user);
    }, [user]);

    return (
        <Grid sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ mb: 2, color: theme.palette.primary.main }}>Hey, {user?.username || ''}!</Typography>
          <Typography sx={{ mb: 2 }}>
            Wähle einen Namen – dieser ist für alle teilnehmer sichtbar und wird in der High-Score-Liste angezeigt. Außerdem kannst du eine Skin-Farbe ... Wähle einen Namen – dieser ist für alle teilnehmer sichtbar und wird in der High-Score-Liste angezeigt.
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Wähle einen Namen – dieser ist für alle teilnehmer sichtbar und wird in der High-Score-Liste angezeigt. Außerdem kannst du eine Skin-Farbe ... Wähle einen Namen.
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <Button variant='contained' sx={{ width: '100%' }} href="/">Ich bin bereit!</Button>
          </Box>
        </Grid>
      )
}

export default WelcomeUser;