import { Box, Button, Grid, Typography, useTheme } from "@mui/material"
import ScanArea from "./ScanArea"
import quests from "../../data/quests";
import { useContext, useState } from "react";
import { GlobalContext } from "../../provider/GlobalProvider";
import { useRouter } from "next/router";

const SideQuest = ({ questName }) => {
    const router = useRouter();
    const { user } = useContext(GlobalContext);
    const [isScanning, setIsScanning] = useState(false);
    const theme = useTheme();
    const questData = quests[questName];

    console.log('SIDE QUEST', user);

    if (!user || !user.quests) {
        return '';
    }

    const quest = user.quests.filter((quest) => quest.questId === questData.questId)[0];

    const onScannedQRCode = async () => {
        const userAfterUpdate = await updateQuest(user, quest);
        console.log(userAfterUpdate);
        setIsScanning(false);
        router.push('/finishedSideQuest');
    };

    const startScanner = () => {
        setIsScanning(true);
      }

    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />{questData.title}</Typography>
            <Typography sx={{ mb: 3 }}>Quest:<br />{questData.description}</Typography>
            <Box>
                <ScanArea isScanning={isScanning} onScannedQRCode={onScannedQRCode} />
            </Box>
            <Button variant='contained' sx={{ width: '100%', color: theme.palette.secondary.main }} onClick={() => startScanner()}>
                Code scannen
            </Button>
        </Grid>
    )
}

export default SideQuest