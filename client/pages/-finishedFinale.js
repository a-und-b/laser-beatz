import NextImage from 'next/image'
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import Gem from '../shared/Other/Gem';

const FinishedFinale = () => {
    const theme = useTheme();
    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 200, mb: 2 }}>
                <NextImage src={`/img/aurora-${theme.laserbeatzMode}.svg`} width='250' height='250' />
            </Box>
            <Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>Finale Abstimmung abgeschlossen</Typography>
            <Typography variant='h1' sx={{ textAlign: 'center', mb: 2, color: theme.palette.primary.main }}>“Danke für deine Stimme! Wir sehen uns gleich die Ergebnisse gemeinsam an.“</Typography>
            <Button variant='contained' sx={{ width: '100%' }} href="/questLog">
                Weiter geht's!
                {/* <Gem /> */}
            </Button>
        </Grid>
    ); 
}

export default FinishedFinale;