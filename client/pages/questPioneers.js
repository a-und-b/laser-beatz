import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { updateQuest } from "../api";
import { GlobalContext } from "../provider/GlobalProvider";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import PlusIcon from "../shared/Icons/Plus";
import MinusIcon from "../shared/Icons/Minus";
import HomeButton from "../shared/Other/HomeButton";
import ScanArea from "../shared/Other/ScanArea";

const getTotalUsedCyberCredits = (usages) => {
    return usages.map(usage => usage.value).reduce((a, b) => a + b);
}

const defaultUsages = [
    {
        title: 'Idee 1',
        value: 0
    },
    {
        title: 'Idee 2',
        value: 0
    },
    {
        title: 'Idee 3',
        value: 0
    },
    {
        title: 'Idee 4',
        value: 0
    },
    {
        title: 'Idee 5',
        value: 0
    },
];

const IdeaPool = () => {
    const questId = '15';
    const theme = useTheme();
    const router = useRouter();
    const maxCyberCredits = 8;
    const { user, showAlert } = useContext(GlobalContext);
    // console.log('USER', user);
    const quest = user && user.quests ? user.quests.filter((quest) => quest.questId === questId)[0] : null;
    // console.log('QUEST', quest?.userInput?.usages);
    const [usages, setUsages] = useState(defaultUsages);
    console.log('USAGES', usages);
    // console.log('USAGES', usages);
    const [cyberCredits, setCyberCredits] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        if (quest?.userInput?.usages) {
            if (quest?.totalFinished) {
                setActivated(true);
            }
            setUsages(quest.userInput.usages);
            setCyberCredits(getTotalUsedCyberCredits(quest.userInput.usages))
        }
    }, [quest]);

    const isEnabled = () => {
        const mainQuests = user.quests.filter((quest) => quest.questId === 1 || quest.questId === 2 || quest.questId === 3);
        const unfinishedMainQuests = mainQuests.filter((quest) => quest.totalFinished === 0);

        return unfinishedMainQuests.length === 0;
    }

    if (!quest || !user || isEmpty(user) || !isEnabled()) {
        return '';
    };

    const handleSubmit = async () => {
        if (cyberCredits < maxCyberCredits) {
            showAlert('Bitte vergib alle Stunden.');
            return;
        }

        if (!quest.userInput) {
            quest.userInput = {};
        }
        quest.userInput.usages = usages;
        await updateQuest(user, quest);
        router.push('/finishedMainQuest');
    }

    const updateUsage = (usageIndex, updateValue) => {
        let totalUsedCyberCredits = getTotalUsedCyberCredits(usages);

        if (updateValue > 0 && totalUsedCyberCredits === maxCyberCredits) return;

        const updatedUsages = usages;

        if (updatedUsages[usageIndex].value + updateValue < 0) {
            updatedUsages[usageIndex].value = 0;
        } else if (updatedUsages[usageIndex].value + updateValue > maxCyberCredits) {
            updatedUsages[usageIndex].value = maxCyberCredits;
        } else {
            updatedUsages[usageIndex].value += updateValue;
        }

        setUsages([...updatedUsages]);
        setCyberCredits(getTotalUsedCyberCredits(usages));
    };

    const calculateUsageShare = (usageValue) => {
        return Math.floor((usageValue / maxCyberCredits) * 100);
    }

    const onScannedQRCode = async (result) => {
        if (result.includes('pioneers-of-tomorrow.de/scannedQuest') && result.split('pioneers-of-tomorrow.de/scannedQuest/').length > 1) {
            const part = result.split('pioneers-of-tomorrow.de/scannedQuest/')[1];
            const parts = part.split('-');
            const questIdPart = parts[1];
            const hash = parts[2];

            console.log('QUEST ID', questId)

            if (questIdPart === questId) {
                setActivated(true);
                setIsScanning(false);
            } else {
                setActivated(false);
                showAlert('Der gescannte Code passt nicht zu dieser Quest. Bitte wähle die richtige Quest für diesen Code aus.');
            }
        }
    }


    const startScanner = () => {
        setIsScanning(true);
    }

    const renderScanView = () => {
        return (
            <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />Digital District</Typography>
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

    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />Abstimmung Ideen</Typography>
            <Typography sx={{ mb: 3 }}>Cyber Credits gesamt:</Typography>
            <Typography variant='h2' sx={{ mb: 3 }}>{cyberCredits.toLocaleString('de-DE', { minimumIntegerDigits: 3 })} / {maxCyberCredits} Stunden</Typography>
            <Box sx={{ mb: 15 }}>
                {
                    usages.map((usage, usageIndex) => (
                        <Box sx={{ mb: 3 }} key={usageIndex}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>{usage.title}</Typography>
                                <Typography>{calculateUsageShare(usage.value)}%</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px' }}>
                                <Typography sx={{ flexGrow: 1, pl: 2, py: 2 }}>{usage.value} Stunden</Typography>
                                <Box sx={{ borderLeft: `1px dashed ${theme.palette.primary.main}` }}>
                                    <Button onClick={() => updateUsage(usageIndex, 1)}>
                                        <PlusIcon fill={theme.palette.primary.main} />
                                    </Button>
                                </Box>
                                <Box sx={{ borderLeft: `1px dashed ${theme.palette.primary.main}` }}>
                                    <Button onClick={() => updateUsage(usageIndex, -1)}>
                                        <MinusIcon fill={theme.palette.primary.main} />
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    ))
                }
            </Box>
            {
                !quest.totalFinished && (
                    <Box sx={{ py: 2, px: 2, display: 'flex', position: 'fixed', width: '100%', bottom: 0, left: 0, background: theme.palette.secondary.dark }}>
                        <Button variant='contained' onClick={handleSubmit} sx={{ mb: 1, width: '100%' }}>Credits überweisen</Button>
                    </Box>
                )
            }
        </Grid >
    )
}

export default IdeaPool;
