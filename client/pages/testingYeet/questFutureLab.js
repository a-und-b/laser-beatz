import { Button, Grid, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../../provider/GlobalProvider";
import { isEmpty } from "lodash";
import { updateQuest } from "../../api";
import { useRouter } from "next/router";

const FutureLab = () => {
    const theme = useTheme();
    const router = useRouter()
    const questId = "8";
    const { user } = useContext(GlobalContext);
    
    if (!user || isEmpty(user)) {
        return '';
    };

    const quest = user.quests.filter((quest) => quest.questId === questId)[0];

    const handleFinish = async () => {
        try {
            await updateQuest(user, quest);
            router.push('/testingYeet/questLog');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />Future Lab</Typography>
            <Button onClick={handleFinish}>Finish</Button>
        </Grid>
    )
}

export default FutureLab;
