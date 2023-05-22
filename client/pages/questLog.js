import { Box, Grid, Link, Typography, useTheme } from "@mui/material"
import { useContext } from "react";
import { UserContext } from "../provider/UserProvider";
import NextImage from 'next/image'

const QuestLog = ({ }) => {
  const theme = useTheme();
  const [user] = useContext(UserContext);
  const mainQuests = [
    {
      title: 'Dream Decoder',
      url: '/dreamDecoder',
    },
    {
      title: 'Digital District',
      url: '/digitalDistrict',
    },
    {
      title: 'Crypto Station',
      url: '/cryptoStation',
    }
  ];

  const sideQuests = [
    {
      title: 'KI Labor',
      url: '/dreamDecoder',
    },
    {
      title: 'Knowledge Space',
      url: '/digitalDistrict',
    },
    {
      title: 'Gaming Station',
      url: '/cryptoStation',
    },
    {
      title: 'KI Labor',
      url: '/dreamDecoder',
    },
    {
      title: 'Knowledge Space',
      url: '/digitalDistrict',
    },
    {
      title: 'Gaming Station',
      url: '/cryptoStation',
    }
  ];

  const renderMainQuestEntry = (entry, index) => (
    <Box key={index} sx={{ borderBottom: `1px dashed ${theme.palette.primary.main}` }}>
      <Link sx={{ p: 2, display: 'inline-block', width: '100%', textDecoration: 'none', color: 'white' }} href={entry.url}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 50, height: 50, borderRadius: 50, border: `1px solid ${theme.palette.primary.main}`, mr: 2 }} />
          <Typography variant='h3'>{entry.title}</Typography>
        </Box>
      </Link>
    </Box>
  );

  const renderMainQuestList = () => (
    <Box sx={{ border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px', mb: 5 }}>
      {mainQuests.map((mainQuest, index) => renderMainQuestEntry(mainQuest, index))}
    </Box>
  );

  const renderSideQuestEntry = (entry, index) => (
    <Box index={index} sx={{ borderBottom: `1px dashed ${theme.palette.primary.main}` }}>
      <Link sx={{ p: 2, display: 'inline-block', width: '100%', textDecoration: 'none', color: 'white' }} href={entry.url}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NextImage src='/img/icons/star.svg' width={24} height={24} />
          <Typography variant='h5' sx={{ ml: 2 }}>{entry.title}</Typography>
        </Box>
      </Link>
    </Box>
  );

  const renderSideQuestList = () => (
    <Box sx={{ border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px', mb: 5 }}>
      {sideQuests.map((sideQuest, index) => renderSideQuestEntry(sideQuest, index))}
    </Box>
  );

  return (
    <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest-Log</Typography>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>Quests</Typography>
          <Typography variant='h2'>0 / 10</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>Deine Punktzahl</Typography>
          <Typography variant='h2'>{user.score || '000.000'}</Typography>
        </Grid>
      </Grid>
      <Typography variant='h5' sx={{ mb: 1 }}>Main-Quests 0/3</Typography>
      {renderMainQuestList()}
      <Typography variant='h5' sx={{ mb: 1 }}>Side-Quests 0/6</Typography>
      {renderSideQuestList()}
    </Grid>
  )
}

export default QuestLog