import { Box, CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import NextImage from 'next/image'

const Countdown = () => {
    const theme = useTheme();

    return (
        <Grid>
            {/* <Typography variant='h2' sx={{ color: theme.palette.primary.main }}>Der Countdown läuft!</Typography> */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4, position: 'relative' }}>
                <CircularProgress variant="determinate" value={55} sx={{
                    width: '220px !important',
                    height: '220px !important',

                    'svg': {
                        overflow: 'visible',
                    },

                    'svg circle': {
                        filter: 'drop-shadow( 0px 0px 3px rgba(84, 236, 51, 1))',
                    }
                }} />
                <Typography variant='h3' sx={{ color: theme.palette.primary.main, position: 'absolute' }}>000:00:00</Typography>
            </Box> */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3">Bald gibt es hier mehr zu sehen.</Typography>
                <Typography variant="h3">Mehr Infos auf dem <a style={{ color: theme.palette.primary.main }} href="/documents/pioneers-flyer.pdf" target="_blank">Flyer</a>.</Typography>
            </Box>
        </Grid >
    );
}

export default Countdown;