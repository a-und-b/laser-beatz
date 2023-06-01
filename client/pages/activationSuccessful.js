import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import Gem from '../shared/Other/Gem';
import { useContext } from "react";
import GlobalProvider from "../provider/GlobalProvider";

const ActivationSuccessful = () => {
    const theme = useTheme();
    const { user } = useContext(GlobalProvider);
    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 200, mb: 2 }}>
                <NextImage src={`/img/aurora-${theme.laserbeatzMode}.svg`} width='250' height='250' />
            </Box>
            <Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>Aktivierung erfolgreich</Typography>
            <Typography variant='h1' sx={{ textAlign: 'center', mb: 2, color: theme.palette.primary.main }}>“Herzlich Willkommen, {user.username}!“</Typography>
            <Button variant='contained' sx={{ width: '100%' }} href="/welcomeUser">
                Los geht's!
                <Gem />
            </Button>
        </Grid>
    );
}

export default ActivationSuccessful;