import NextImage from 'next/image'
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import Gem from '../shared/Other/Gem';

const FinishedPioneer = () => {
    const theme = useTheme();
    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 200, mb: 2 }}>
            <NextImage src={`/img/aurora-${theme.laserbeatzMode}.svg`} width='250' height='250' />
            </Box>
            <Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>Alle Main-Quests abgeschlossen</Typography>
            <Typography variant='h1' sx={{ textAlign: 'center', mb: 2, color: theme.palette.primary.main }}>“Du bist klasse!“</Typography>
            <Button variant='contained' sx={{ width: '100%' }} href="/questLog">
                Weiter geht's!
                {/* <Gem /> */}
            </Button>
        </Grid>
    ); 
}

export default FinishedPioneer;