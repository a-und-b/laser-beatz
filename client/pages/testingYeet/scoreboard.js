import { Box, Button, CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getHighScoreList } from "../../api";

const Scoreboard = ({ highscoreList = [] }) => {
    const theme = useTheme();

    if (!highscoreList) {
        return (
            <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Grid>
        );
    }

    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Highscore</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant='h5'>Name</Typography>
                <Typography variant='h5'>Punktzahl</Typography>
            </Box>
            {
                highscoreList.map((entry, index) => (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pb:2, borderBottom: `1px dashed ${theme.palette.primary.main}`, mb:2 }} key={index}>
                        <Typography variant='h4'>{entry.username}</Typography>
                        <Typography variant='h4'>{entry.score}</Typography>
                    </Box>
                ))
            }
        </Grid>
    )
}

export const getStaticProps = async () => {
    const highscoreListRes = await getHighScoreList();
    const highscoreList = highscoreListRes.results;

    return { props: { highscoreList }};
};

export default Scoreboard;