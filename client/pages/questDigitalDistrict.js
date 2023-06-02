import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../provider/GlobalProvider";
import { isEmpty } from "lodash";
import { updateQuest } from "../api";
import { useRouter } from "next/router";
import FaceSmileFilledIcon from "../shared/Icons/FaceSmileFilled";
import FaceSmileOutlineIcon from "../shared/Icons/FaceSmileOutline";
import FaceThinkingFilledIcon from "../shared/Icons/FaceThinkingFilled";
import FaceThinkingOutlineIcon from "../shared/Icons/FaceThinkingOutline";
import FaceFrowningFilledIcon from "../shared/Icons/FaceFrowningFilled";
import FaceFrowningOutlineIcon from "../shared/Icons/FaceFrowningOutline";
import Gem from "../shared/Other/Gem";
import ScanArea from "../shared/Other/ScanArea";
import HomeButton from "../shared/Other/HomeButton";

const DigitalDistrict = () => {
    const districtData = [
        {
            name: "Streetball-Platz",
            rating: null,
        },
        {
            name: "Bahnhof innen",
            rating: null,
        },
        {
            name: "Bahnhof außen",
            rating: null,
        },
        {
            name: "Wittelsbacher Park",
            rating: null,
        },
        {
            name: "Rekkenzeplatz",
            rating: null,
        },
        {
            name: "Freibad",
            rating: null,
        },
        {
            name: "Lichthaus",
            rating: null,
        },
        {
            name: "Jugendzentrum Q",
            rating: null,
        },
        {
            name: "Treffpunkt",
            rating: null,
        },
        {
            name: "An der Saale",
            rating: null,
        },
        {
            name: "Luftsteg am Bahnhof",
            rating: null,
        }
    ];
    const theme = useTheme();
    const router = useRouter();
    const questId = "2";
    const { user, showAlert } = useContext(GlobalContext);

    if (!user || isEmpty(user)) {
        return '';
    };

    const quest = user.quests.filter((quest) => quest.questId === questId)[0];

    console.log('QUEST', quest);

    if (!quest.userInput) {
        quest.userInput = {};
    }

    if (!quest.userInput?.districts?.length) {
        quest.userInput.districts = [];
    }

    const [districts, setDistricts] = useState(quest.userInput.districts.length ? quest.userInput.districts : districtData);
    const [isScanning, setIsScanning] = useState(false);
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        if (quest.totalFinished) {
            setActivated(true);
        }
    }, [quest]);

    const handleFinish = async () => {
        try {
            if (districts.filter(district => district.rating === null).length) {
                showAlert('Bitte stimme zu allen Orten ab.')
                return;
            }
            await updateQuest(user, quest);
            router.push('/finishedMainQuest');
        } catch (error) {
            console.error(error);
        }
    }

    const primaryColor = theme.palette.primary.main;

    const handleDistrictRatingChange = (districtIndex, rating) => {
        const updatedDistricts = districts;
        updatedDistricts[districtIndex].rating = rating;
        console.log('1', updatedDistricts);
        quest.userInput.districts = [...updatedDistricts];
        console.log(2, quest.userInput.districts);
        setDistricts([...updatedDistricts]);
        console.log(3, districts);
        return;
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
            <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest:<br />Digital District</Typography>
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6' >Orte markieren</Typography>
                <Typography variant='h6' >{districts.filter(district => district.rating).length} von {districts.length}</Typography>
            </Box>
            <Box sx={{ border: `1px dashed ${primaryColor}`, borderRadius: '5px', mb: 15 }}>
                {
                    districts.map((district, districtIndex) => (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px dashed ${primaryColor}` }}>
                            <Box sx={{ p: 2, flexGrow: 1 }}>
                                <Typography>{district.name}</Typography>
                            </Box>
                            <Box sx={{ py: 2, borderLeft: `1px dashed ${primaryColor}`, display: 'flex', alignItems: 'center' }}>
                                <Button onClick={() => handleDistrictRatingChange(districtIndex, 'good')}>
                                    {district.rating === 'good' ? <FaceSmileFilledIcon fill={primaryColor} /> : <FaceSmileOutlineIcon fill={primaryColor} />}
                                </Button>
                            </Box>
                            <Box sx={{ py: 2, borderLeft: `1px dashed ${primaryColor}`, display: 'flex', alignItems: 'center' }}>
                                <Button onClick={() => handleDistrictRatingChange(districtIndex, 'neutral')}>
                                    {district.rating === 'neutral' ? <FaceThinkingFilledIcon fill={primaryColor} /> : <FaceThinkingOutlineIcon fill={primaryColor} />}
                                </Button>
                            </Box>
                            <Box sx={{ py: 2, borderLeft: `1px dashed ${primaryColor}`, display: 'flex', alignItems: 'center' }}>
                                <Button onClick={() => handleDistrictRatingChange(districtIndex, 'bad')}>
                                    {district.rating === 'bad' ? <FaceFrowningFilledIcon fill={primaryColor} /> : <FaceFrowningOutlineIcon fill={primaryColor} />}
                                </Button>
                            </Box>
                        </Box>
                    ))
                }
            </Box>

            {
                !quest.totalFinished && (
                    <Box sx={{ py: 2, px: 2, display: 'flex', position: 'fixed', width: '100%', bottom: 0, left: 0, background: theme.palette.secondary.dark }}>
                        <Grid item xs={10} sx={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Button variant='contained' onClick={handleFinish} sx={{ width: '100%' }}>Markierung übermitteln</Button>
                        </Grid>
                    </Box>
                )
            }
            {/* <Gem size={75} sx={{ position: 'absolute', right: -20 }} /> */}
        </Grid >
    )
}

export default DigitalDistrict;
