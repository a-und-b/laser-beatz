import { Grid, Typography, useTheme } from "@mui/material";

const NeonSchminke = () => {
    const theme = useTheme();
    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />Neon Schminke</Typography>
        </Grid>
    )
}

export default NeonSchminke;