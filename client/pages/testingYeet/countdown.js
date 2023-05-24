import { Box, CircularProgress, Grid, Typography, useTheme } from "@mui/material";

const Countdown = () => {
    const theme = useTheme();

    return (
        <Grid>
            <Typography variant='h2' sx={{ color: theme.palette.primary.main }}>Der Countdown läuft!</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4, position: 'relative' }}>
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
            </Box>
            <Typography>Scanne den Qr-Code auf deinem Ticket euch den Pioneers of Tomorrow an und erlebt ein Abenteuer voller die Zukunft, von der ihr träumt.</Typography>
        </Grid >
    );
}

export default Countdown;