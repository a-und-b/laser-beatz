import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography, createTheme, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../../provider/UserProvider";
import { updateUser } from "../../api";

const IntroUserSettings = () => {
    const [username, setUsername] = useState('')
    const [user, setUser] = useContext(UserContext);
    const [theme, setTheme] = useState(useTheme());
    const router = useRouter();

    console.log('USER SET', user);

    const updateTheme = (newPrimaryColor) => {
        const updatedTheme = theme;
        const newPrimaryColorMain = updatedTheme.palette[newPrimaryColor].main;
        // const newPrimaryColorLight = updatedTheme.palette[newPrimaryColor].light;
        updatedTheme.palette.primary.main = newPrimaryColorMain;
        // updatedTheme.palette.primary.light = newPrimaryColorLight;

        console.log(updatedTheme);
        // createTheme(updatedTheme);
        setTheme(updatedTheme);
    }

    const handleSubmit = async () => {
        try {
            user.username = username;
            setUser(user);
            await updateUser(user);
            router.push('/intro/welcomeUser');
        } catch (error) {
            // TODO: handle error
        }
    }

    return (
        <Grid>
            <Typography variant='h2' sx={{ color: theme.palette.primary.main }}>Willkommen, Fremde:r!</Typography>
            <Typography sx={{ mb: 2 }}>Wähle einen Namen – dieser ist für alle teilnehmer sichtbar und wird in der High-Score-Liste angezeigt. Außerdem kannst du eine Skin-Farbe ...</Typography>
            <Box component="form" sx={{ width: '100%' }} noValidate autoComplete="off">
                <Typography sx={{ fontStyle: 'italic' }}>Name eingeben</Typography>
                <TextField
                    variant="outlined"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    sx={{
                        width: '100%',
                        mb: 2,

                        'fieldset': {
                            border: `1px dashed ${theme.palette.primary.main}`,
                            borderRadius: '5px',
                        }
                    }}
                />
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="emerald"
                    name="radio-buttons-group"
                    sx={{ display: 'flex', flexDirection: 'row' }}
                    onChange={(event) => { updateTheme(event.target.value) }}
                >
                    <FormControlLabel value="emerald" control={<Radio color="emerald" />} label="Smaragd" />
                    <FormControlLabel value="ember" control={<Radio color="ember" />} label="Ember" />
                    <FormControlLabel value="ruby" control={<Radio color="ruby" />} label="Rubin" />
                </RadioGroup>
            </Box>
            <Button
                variant='contained'
                sx={{ width: '100%', color: theme.palette.secondary.main }}
                onClick={() => handleSubmit()}
            >
                Ok, auf ins Abenteuer!
            </Button>
        </Grid >
    );
}

export default IntroUserSettings;