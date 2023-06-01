import { Button, useTheme } from "@mui/material"
import HomeIcon from "../Icons/Home";
import { useRouter } from "next/router";

const HomeButton = () => {
    const theme = useTheme();
    const router = useRouter()

    const handleClick = () => {
        router.push('/main');
    };

    return (
        <Button variant='contained' color='secondary' onClick={handleClick} sx={{ p: 1 }}>
            <HomeIcon fill={theme.palette.primary.main} />
        </Button>
    )
}

export default HomeButton;
