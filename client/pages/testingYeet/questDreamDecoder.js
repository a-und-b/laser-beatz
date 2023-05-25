import { Box, Button, Grid, Link, TextField, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { updateQuest } from "../../api";
import { GlobalContext } from "../../provider/GlobalProvider";
import { isEmpty } from "lodash";
import Gem from "../../shared/Other/Gem";

const DreamDecoder = () => {
    const questId = "1";
    const theme = useTheme();
    const { user } = useContext(GlobalContext);

    if (!user || isEmpty(user)) {
        return '';
    };

    const quest = user.quests.filter((quest) => quest.questId === questId)[0];

    if (!quest.userInput) {
        quest.userInput = {};
    }

    if (!quest.userInput?.ideas?.length) {
        quest.userInput.ideas = [];
    }


    const [input, setInput] = useState('');
    const [isInAddingMode, setIsInAddingMode] = useState(!quest.userInput?.ideas.length);
    const [ideas, setIdeas] = useState(quest.userInput?.ideas || []);

    console.log('DREAM DECODERR', ideas, isInAddingMode);

    const handleSaveIdea = async () => {
        ideas.push(input);
        setIdeas(ideas)
        quest.userInput.ideas = ideas;
        await updateQuest(user, quest);

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
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Button variant='contained' sx={{ width: '100%', fontSize: 16 }} onClick={() => handleAddAnotherIdea()}>+</Button>
                    </Grid>
                    <Grid item xs={10} sx={{ position: 'relative', display: 'flex', alignItems:'center' }}>
                        <Button variant='contained' sx={{ width: '100%', fontSize: 16 }} href="/testingYeet/finishedMainQuest">Erledigt</Button>
                        <Gem size={75} sx={{position: 'absolute', right: -20 }} />
                    </Grid>
                </Grid>
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