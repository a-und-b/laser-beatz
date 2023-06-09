import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";


const Landing = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Grid>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ mt: 5 }}>Wir planen ein <span style={{ color: theme.palette.primary.main}}>Open Air Kino</span>!</Typography>
                <Typography variant="h3" sx={{ mt: 5 }}>Das nächste Treffen der Pioneers of Tomorrow findet am <span style={{ color: theme.palette.primary.main}}>13.06.</span> um <span style={{ color: theme.palette.primary.main}}>18 Uhr</span> im Jugendzentrum Q statt.</Typography>
            </Box>
        </Grid >
    );
}

export default Landing;