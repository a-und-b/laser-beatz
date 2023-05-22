import { Box, Button, Grid, Link, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";

const DreamDecoder = () => {
    const theme = useTheme();
    const [input, setInput] = useState('');
    const [isInAddingMode, setIsInAddingMode] = useState(true);
    const [ideas, setIdeas] = useState([]);

    const handleSaveIdea = () => {
        ideas.push(input);
        setIsInAddingMode(false);
        setInput('');
    }

    const handleAddAnotherIdea = () => {
        setIsInAddingMode(true);
        setInput('');
    }

    const renderInputView = () => {
        return (
            <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />Dream Decoder</Typography>
                <Typography variant='h6' sx={{ mb: 1 }} >Idee eingeben</Typography>
                <TextField
                    variant="outlined"
                    value={input}
                    multiline
                    minRows={10}
                    onChange={(event) => setInput(event.target.value)}
                    sx={{
                        width: '100%',
                        mb: 3,

                        'fieldset': {
                            border: `1px dashed ${theme.palette.primary.main}`,
                            borderRadius: '5px',
                        }
                    }}
                />
                <Button variant='contained' sx={{ width: '100%' }} onClick={() => handleSaveIdea()}>Idee speichern</Button>
            </Grid>
        );
    }



    const renderListView = () => {
        return (
            <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />Dream Decoder</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant='h5'>Deine Ideen</Typography>
                    <Typography variant='h5'>({ideas.length})</Typography>
                </Box>
                <Box sx={{ border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px', mb: 5 }}>
                    {ideas.map((idea, index) => renderListElement(idea, index))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant='contained' sx={{ width: '100%' }} onClick={() => handleAddAnotherIdea()}>+</Button>
                    <Button variant='contained' sx={{ width: '100%' }} href="/quests/finishedMainQuest">Erledigt</Button>
                </Box>
            </Grid>
        );
    }

    const renderListElement = (textContent, index) => {
        return (
            <Box sx={{ p: 3, borderBottom: `1px dashed ${theme.palette.primary.main}` }} key={index}>
                <Typography variant='h6'>„{textContent}“</Typography>
            </Box>
        )
    }

    if (!ideas.length || isInAddingMode) {
        return renderInputView();
    } else {
        return renderListView();
    }

}

export default DreamDecoder;