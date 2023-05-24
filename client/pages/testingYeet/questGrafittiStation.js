import { Grid, Typography, useTheme } from "@mui/material";

const GrafittiStation = () => {
    const theme = useTheme();
    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />Grafitti Station</Typography>
        </Grid>
    )
}

export default GrafittiStation;