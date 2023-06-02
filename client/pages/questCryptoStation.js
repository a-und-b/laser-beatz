import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { updateQuest } from "../api";
import { GlobalContext } from "../provider/GlobalProvider";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

const getTotalUsedCyberCredits = (usages) => {
    return usages.map(usage => usage.value).reduce((a, b) => a + b);
}

const defaultUsages = [
    {
        title: 'Konzerte',
        value: 0
    },
    {
        title: 'Verschönerung des Viertels',
        value: 0
    },
    {
        title: 'Naturprojekte',
        value: 0
    },
    {
        title: 'Workshops',
        value: 0
    },
    {
        title: 'Tanzprojekt',
        value: 0
    },
    {
        title: 'Turniere',
        value: 0
    },
    {
        title: 'Sportevents',
        value: 0
    },
    {
        title: 'Ausflüge',
        value: 0
    },
    {
        title: 'Graffiti-Workshop',
        value: 0
    },
    {
        title: 'Urban Gardening',
        value: 0
    },
    {
        title: 'Partys',
        value: 0
    },
    {
        title: 'Reisen / Jugendaustausch',
        value: 0
    },
    {
        title: 'Jugendcafé / Jugendtreffpunkt',
        value: 0
    },
    {
        title: 'Flossbau / Kanutour',
        value: 0
    },
    {
        title: 'Zelten',
        value: 0
    },
    {
        title: 'Kunstprojekt',
        value: 0
    },
    {
        title: 'Märkte (z. B. Flohmarkt)',
        value: 0
    },
];

const CryptoStation = () => {
    const questId = '3';
    const theme = useTheme();
    const router = useRouter();
    const maxCyberCredits = 150000;
    const { user } = useContext(GlobalContext);
    // console.log('USER', user);
    const quest = user && user.quests ? user.quests.filter((quest) => quest.questId === questId)[0] : null;
    // console.log('QUEST', quest?.userInput?.usages);
    const [usages, setUsages] = useState(defaultUsages);
    // console.log('USAGES', usages);
    const [cyberCredits, setCyberCredits] = useState(0);

    useEffect(() => {
        if (quest?.userInput?.usages) {
            setUsages(quest.userInput.usages);
            setCyberCredits(getTotalUsedCyberCredits(quest.userInput.usages))
        }
    }, [quest]);

    if (!quest || !user || isEmpty(user)) {
        return '';
    };

    const handleSubmit = async () => {
        if (cyberCredits < maxCyberCredits) {
            return alert('Bitte vergib alle Credits (TODO: dies wird noch hübscher gemacht).');
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

    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />Crypto Station</Typography>
            <Typography sx={{ mb: 3 }}>Cyber Credits gesamt:</Typography>
            <Typography variant='h2' sx={{ mb: 8 }}>{cyberCredits.toLocaleString('de-DE', { minimumIntegerDigits: 6, useGrouping: true })} / {maxCyberCredits.toLocaleString('de-DE', { minimumIntegerDigits: 6, useGrouping: true })}</Typography>
            <Box sx={{ mb: 15 }}>
                {
                    usages.map((usage, usageIndex) => (
                        <Box sx={{ mb: 3 }} key={usageIndex}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>{usage.title}</Typography>
                                <Typography>{calculateUsageShare(usage.value)}%</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px' }}>
                                <Typography sx={{ flexGrow: 1, pl: 2, py: 2, fontSize: 28 }}>{usage.value.toLocaleString('de-DE', { minimumIntegerDigits: 6, useGrouping: true })}</Typography>
                                <Box sx={{ borderLeft: `1px dashed ${theme.palette.primary.main}` }}>
                                    <Button onClick={() => updateUsage(usageIndex, 10000)}>+</Button>
                                </Box>
                                <Box sx={{ borderLeft: `1px dashed ${theme.palette.primary.main}` }}>
                                    <Button onClick={() => updateUsage(usageIndex, -10000)}>-</Button>
                                </Box>
                            </Box>
                        </Box>
                    ))
                }
            </Box>
            <Box sx={{ py: 2, px: 2, display: 'flex', position: 'fixed', width: '100%', bottom: 0, left: 0, background: theme.palette.secondary.dark }}>
                <Button variant='contained' onClick={handleSubmit} sx={{ mb: 1, width: '100%' }}>Credits überweisen</Button>
            </Box>
        </Grid>
    )
}

export default CryptoStation;
