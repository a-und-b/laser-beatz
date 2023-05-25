import { Box, CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import NextImage from 'next/image'
import Countdown from 'react-countdown';


const Landing = () => {
    const theme = useTheme();

    const renderer = ({ days, formatted: { hours, minutes, seconds }, completed }) => {
        if (completed) {
        } else {
          // Render a countdown
          return <Typography variant="h2" color={theme.palette.primary.main}>{days} Tage {hours}:{minutes}:{seconds}</Typography>;
        }
      };

      console.log(new Date(Date.UTC(2023, 5, 3, 14, 0, 0)));
    

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
                <Countdown
                    date={new Date(Date.UTC(2023, 5, 3, 14, 0, 0))} 
                    renderer={renderer}
                    zeroPadTime={2}
                />
                <Typography variant="h3" sx={{ mt: 5 }}>Bald gibt es hier mehr zu sehen.</Typography>
                <Typography variant="h3">Mehr Infos auf dem <a style={{ color: theme.palette.primary.main }} href="https://cdn.andersundbesser.de/pioneers/pioneers-flyer.pdf" target="_blank">Flyer</a>.</Typography>
            </Box>
        </Grid >
    );
}

export default Landing;