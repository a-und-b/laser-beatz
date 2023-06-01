import { Box, Button, Grid } from "@mui/material";
import ScanArea from "../../shared/Other/ScanArea";
import { useContext, useState } from "react";
import { GlobalContext } from "../../provider/GlobalProvider";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

const Scan = () => {
    const theme = useTheme();
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const { user, setUser } = useContext(GlobalContext);
    const [isScanning, setIsScanning] = useState(false);

    const getUserByQRLinkAndRedirect = async (decodedText = 'http://pioneers-of-tomorrow.de/n9okhm5k') => {
        const userId = decodedText.split("pioneers-of-tomorrow.de/")[1];
        const userData = await getUser(userId);
        setUser(userData);
        if (userData.userName) {
            router.push('/testingYeet')
        } else {
            router.push('/testingYeet/userSettings')
        }
        return userData;
    };

    const onScannedQRCode = async (decodedText) => {
        console.log('osqrc', decodedText);
        await getUserByQRLinkAndRedirect(decodedText);
    }


    const startScanner = () => {
        setIsScanning(true);
    }

    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ mb: 2, width: '100%' }}>
                <ScanArea {...{ isScanning, onScannedQRCode }} />
            </Box>
            <Button variant='contained' sx={{ width: '100%', color: theme.palette.secondary.main }} onClick={() => startScanner()}>
                Code scannen
            </Button>
        </Grid>
    );
}

export default Scan;