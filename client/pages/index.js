import { Box, Grid, Link, Typography, useTheme } from "@mui/material"
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../provider/UserProvider";
import { isEmpty } from "lodash";

const Main = ({ }) => {
  const theme = useTheme();
  const [user] = useContext(UserContext);
  const router = useRouter();

  console.log('USER', user);

  if (isEmpty(user)) {
    // router.push('/intro/scanUser');
  }


  const renderList = () => (
    <Box sx={{ border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px', mb: 5 }}>
      <Box sx={{ borderBottom: `1px dashed ${theme.palette.primary.main}` }}>
        <Link href='/questLog' sx={{ p: 3, display: 'inline-block', width: '100%' }}>
          <Typography variant='h3'>Quest-Log</Typography>
        </Link>
      </Box>
      <Box sx={{ borderBottom: `1px dashed ${theme.palette.primary.main}` }}>
        <Link href='/questLog' sx={{ p: 3, display: 'inline-block', width: '100%' }}>
          <Typography variant='h3'>Live-Highscore</Typography>
        </Link>
      </Box>
      <Box>
        <Link href='/questLog' sx={{ p: 3, display: 'inline-block', width: '100%' }}>
          <Typography variant='h3'>Zeitplan</Typography>
        </Link>
      </Box>
    </Box>
  );

  return (
    <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Hauptmenü</Typography>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>Quests</Typography>
          <Typography variant='h2'>0 / 10</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>Deine Punktzahl</Typography>
          <Typography variant='h2'>{user.score}</Typography>
        </Grid>
      </Grid>
      <Typography variant='h3'>Abenteuer</Typography>
      {renderList()}
      <Typography variant='h3'>Drumherum</Typography>
      {renderList()}
      <Typography variant='h3'>Sonstiges</Typography>
      {renderList()}
    </Grid>
  )
}

export default Main