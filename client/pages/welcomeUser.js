import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../provider/GlobalProvider";

const WelcomeUser = () => {
    const theme = useTheme();
    const { user } = useContext(GlobalContext);

    console.log('WECOME USER', user);

    useEffect(() => {
      console.log('eff', user);
    }, [user]);

    return (
        <Grid sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ mb: 2, color: theme.palette.primary.main }} variant='h4'>Hey, {user?.username || ''}!</Typography>
          <Typography sx={{ mb: 2 }}>
          Die Zukunft des Bahnhofsviertels liegt in deinen Händen. Durch das Lösen von Quests hast du die Möglichkeit, aktiv Einfluss auf die Entwicklung unseres Viertels zu nehmen und es in eine leuchtende Zukunft zu führen.
          </Typography>
          <Typography sx={{ mb: 15 }}>
          Mit Hilfe unserer KI Aurora und ihren Herlfer:innen vor Ort, sammelst du Punkte, indem du Herausforderungen meisterst und Rätsel löst. Jeder Punkt, den du verdienst, trägt dazu bei, den Verlauf des Tages zu beeinflussen und das Potential unserer Gemeinschaft zu entfalten. Du hast die Möglichkeit neue Fähigkeiten zu erlernen, neue Freundschaften zu schließen und deinen Horizont zu erweitern. 
          </Typography>
          <Box sx={{ position: 'fixed', bottom: 0, left: 16, width: 'calc(100% - 32px)', flexGrow: 1, display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <Button variant='contained' sx={{ width: '100%' }} href="/main">Ich bin bereit!</Button>
          </Box>
        </Grid>
      )
}

export default WelcomeUser;