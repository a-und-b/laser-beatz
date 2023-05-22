import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { GlobalContext } from "../provider/GlobalProvider";
import { updateUser } from "../api";
import { createLaserbeatzTheme, ember, emerald, ruby } from "../lib/theme";

const UserSettings = () => {
    const [username, setUsername] = useState('');
    const { user, setUser, setTheme } = useContext(GlobalContext);
    const router = useRouter();
    const theme = useTheme();

    console.log('THEME', theme.palette);

    const updateTheme = (newPrimaryColor) => {
        let primary;

        switch (newPrimaryColor) {
            case 'ember':
                primary = ember;
                break;
            case 'ruby':
                primary = ruby;
                break;
            case 'emerald':
                primary = emerald;
                break;
            default:
                primary = emerald;
                break;
        }

        const updatedTheme = createLaserbeatzTheme(primary);
        setTheme(updatedTheme);
    }

    const handleSubmit = async () => {
        try {
            user.username = username;
            user.theme = theme.laserbeatzMode;
            setUser(user);
            await updateUser(user);
            router.push('/welcomeUser');
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
                <Typography sx={{ fontStyle: 'italic' }}>Skin auswählen</Typography>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={theme.laserbeatzMode}
                    name="radio-buttons-group"
                    sx={{ display: 'flex', flexDirection: 'row' }}
                    onChange={(event) => { updateTheme(event.target.value) }}
                >
                    <FormControlLabel value="emerald" control={<Radio color="emerald" sx={{ color: theme.palette.emerald.main }} />} label="Smaragd" sx={{ flexGrow: 1, pr: '9px', mx:0, border: `1px dashed ${theme.palette.primary.main}`, borderTopLeftRadius: 5, borderBottomLeftRadius: 5,  }} />
                    <FormControlLabel value="ember" control={<Radio color="ember" sx={{ color: theme.palette.ember.main }} />} label="Ember" sx={{ flexGrow: 1, pr: '9px', mx:0, border: `1px dashed ${theme.palette.primary.main}`, borderRight: 'none', borderLeft: 'none' }} />
                    <FormControlLabel value="ruby" control={<Radio color="ruby" sx={{ color: theme.palette.ruby.main }} />} label="Rubin" sx={{ flexGrow: 1, pr: '9px', mx:0, border: `1px dashed ${theme.palette.primary.main}`, borderTopRightRadius: 5, borderBottomRightRadius: 5 }} />
                </RadioGroup>
            </Box>
            <Button
                variant='contained'
                sx={{ width: '100%', color: theme.palette.secondary.main, mt: 3 }}
                onClick={() => handleSubmit()}
            >
                Ok, auf ins Abenteuer!
            </Button>
        </Grid >
    );
}

export default UserSettings;