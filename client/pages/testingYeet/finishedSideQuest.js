import NextImage from 'next/image'
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";

const FinishedSideQuest = () => {
    const theme = useTheme();
    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 200, mb: 2 }}>
            <NextImage src={`/img/aurora-${theme.laserbeatzMode}.svg`} width='250' height='250' />
            </Box>
            <Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>Side-Quest abgeschlossen</Typography>
            <Button variant='contained' sx={{ width: '100%' }} href="/testingYeet/questLog">
                Weiter geht's!
            </Button>
        </Grid>
    ); 
}

export default FinishedSideQuest;