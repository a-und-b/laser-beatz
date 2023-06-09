import { Box, Button, Grid, Link, TextField, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { updateQuest } from "../api";
import { GlobalContext } from "../provider/GlobalProvider";
import { isEmpty } from "lodash";
import Gem from "../shared/Other/Gem";
import HomeButton from "../shared/Other/HomeButton";
import ScanArea from "../shared/Other/ScanArea";
import PlusIcon from "../shared/Icons/Plus";

const DreamDecoder = () => {
    const questId = "1";
    const theme = useTheme();
    const { user, showAlert } = useContext(GlobalContext);
    const [isScanning, setIsScanning] = useState(false);
    const [activated, setActivated] = useState(false);
    const [input, setInput] = useState('');
    const [isInAddingMode, setIsInAddingMode] = useState(false);
    const [ideas, setIdeas] = useState([]);
    const [quest, setQuest] = useState(null);

    useEffect(() => {
        if (quest?.totalFinished) {
            setActivated(true);
        }

        if (user?.quests) {
            setQuest(user.quests.filter((quest) => quest.questId === questId)[0])
        }
        console.log('QUEST', quest);
        if (quest?.userInput?.ideas) {
            setIdeas(quest.userInput.ideas);
            setIsInAddingMode(false);
        }
    }, [user, quest]);

    if (!user || isEmpty(user)) {
        return '';
    };

    if (quest && !quest.userInput) {
        quest.userInput = {};
        setQuest(quest);
    }

    if (quest && !quest?.userInput?.ideas?.length) {
        quest.userInput.ideas = [];
    }

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
        if (ideas.length === 5) {
            return;
        }
        setIsInAddingMode(true);
        setInput('');
    }

    const onScannedQRCode = async (result) => {
        if (result.includes('pioneers-of-tomorrow.de/scannedQuest') && result.split('pioneers-of-tomorrow.de/scannedQuest/').length > 1) {
            const part = result.split('pioneers-of-tomorrow.de/scannedQuest/')[1];
            const parts = part.split('-');
            const questIdPart = parts[1];
            const hash = parts[2];

            if (questIdPart === questId) {
                setActivated(true);
            } else {
                setActivated(false);
                showAlert('Der gescannte Code passt nicht zu dieser Quest. Bitte wähle die richtige Quest für diesen Code aus.');
            }
        }
    }


    const startScanner = () => {
        setIsScanning(true);
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
                    minRows={5}
                    onChange={(event) => setInput(event.target.value)}
                    sx={{
                        width: '100%',
                        mb: 15,

                        'fieldset': {
                            border: `1px dashed ${theme.palette.primary.main}`,
                            borderRadius: '5px',
                        }
                    }}
                />
                <Box sx={{ py: 2, px: 2, display: 'flex', position: 'fixed', width: '100%', bottom: 0, left: 0, background: theme.palette.secondary.dark }}>
                    <HomeButton />
                    <Button variant='contained' onClick={handleSaveIdea} sx={{ flexGrow: 1, py: 1, px: 3, ml: 1 }}>Idee speichern</Button>
                </Box>
            </Grid>
        );
    }



    const renderListView = () => {
        // TODO fixed button
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
                {
                    !quest.totalFinished && (
                        <div style={{ display: 'flex' }}>
                            {
                                ideas.length < 5 && (
                                    <>
                                        <Button variant='contained' sx={{ fontSize: 16, flexShrink: 1 }} onClick={() => handleAddAnotherIdea()}>
                                            <PlusIcon fill={theme.palette.secondary.main} />
                                        </Button>
                                        <div style={{ width: '20px' }} />
                                    </>
                                )
                            }
                            <Button variant='contained' sx={{ width: '100%' }} href="/finishedMainQuest">Erledigt</Button>
                            {/* <Gem size={75} sx={{ position: 'absolute', right: -20 }} /> */}

                        </div>
                    )
                }
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

    const renderScanView = () => {
        return (
            <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />Dream Decoder</Typography>
                <ScanArea {...{ isScanning, onScannedQRCode }} />
                <Box sx={{ py: 2, px: 2, display: 'flex', position: 'fixed', width: '100%', bottom: 0, left: 0, background: theme.palette.secondary.dark }}>
                    <HomeButton />
                    <Button variant='contained' onClick={startScanner} sx={{ flexGrow: 1, py: 1, px: 3, ml: 1 }}>Quest-Code scannen</Button>
                </Box>
            </Grid>
        );
    }

    if (!activated) {
        return renderScanView();
    }

    if (!ideas.length || isInAddingMode) {
        return renderInputView();
    } else {
        return renderListView();
    }

}

export default DreamDecoder;