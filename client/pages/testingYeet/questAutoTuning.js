import { Grid, Typography, useTheme } from "@mui/material";

const AutoTuning = () => {
    const theme = useTheme();
    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />Auto Tuning</Typography>
        </Grid>
    )
}

export default AutoTuning;