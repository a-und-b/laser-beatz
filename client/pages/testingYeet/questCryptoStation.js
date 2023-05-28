import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { updateQuest } from "../../api";
import { GlobalContext } from "../../provider/GlobalProvider";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

const getTotalUsedCyberCredits = (usages) => {
    return usages.map(usage => usage.value).reduce((a, b) => a + b);
}

const defaultUsages = [
    {
        title: 'Freizeit-Angebot 1',
        value: 0
    },
    {
        title: 'Freizeit-Angebot 2',
        value: 0
    },
    {
        title: 'Freizeit-Angebot 3',
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
        router.push('/testingYeet/finishedMainQuest');
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
            <Typography variant='h2' sx={{ mb: 3 }}>{cyberCredits.toLocaleString('de-DE', { minimumIntegerDigits: 6, useGrouping: true })} / {maxCyberCredits.toLocaleString('de-DE', { minimumIntegerDigits: 6, useGrouping: true })}</Typography>
            {
                usages.map((usage, usageIndex) => (
                    <Box sx={{ mb: 3 }} key={usageIndex}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>{usage.title}</Typography>
                            <Typography>{calculateUsageShare(usage.value)}%</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px' }}>
                            <Typography sx={{ flexGrow: 1, pl: 2, py: 2 }}>{usage.value.toLocaleString('de-DE', { minimumIntegerDigits: 6, useGrouping: true })}</Typography>
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
            <Button variant='contained' onClick={handleSubmit} sx={{ mb: 5 }}>Credits überweisen</Button>
        </Grid>
    )
}

export default CryptoStation;
