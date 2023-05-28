import { Box, Grid, Link, Typography, useTheme } from "@mui/material"
import { useContext } from "react";
import { GlobalContext } from "../../provider/GlobalProvider";
import NextImage from 'next/image'
import StarFilledIcon from "../../shared/Icons/StarFilled";
import StarOutlineIcon from "../../shared/Icons/StarOutline";
import Gem from "../../shared/Other/Gem";
import { useRouter } from "next/router";

const QuestLog = ({ }) => {
  const theme = useTheme();
  const { user } = useContext(GlobalContext);
  const router = useRouter();

  console.log('USER', user);

  if (!user || !user.quests) {
    return '';
  };

  const mainQuests = [
    {
      title: 'Dream Decoder',
      url: '/testingYeet/questDreamDecoder',
      finished: user.quests.filter(quest => quest.questId === '1')[0].totalFinished > 0,
      gemColor: 'emerald',
    },
    {
      title: 'Digital District',
      url: '/testingYeet/questDigitalDistrict',
      finished: user.quests.filter(quest => quest.questId === '2')[0].totalFinished > 0,
      gemColor: 'ember',
    },
    {
      title: 'Crypto Station',
      url: '/testingYeet/questCryptoStation',
      finished: user.quests.filter(quest => quest.questId === '3')[0].totalFinished > 0,
      gemColor: 'ruby',
    }
  ];

  const sideQuests = [
    {
      title: 'Future Lab',
      url: '/testingYeet/questFutureLab',
      finished: user.quests.filter(quest => quest.questId === '8')[0].totalFinished > 0,
    },
    {
      title: 'Manga-Corner',
      url: '/testingYeet/questMangaCorner',
      finished: user.quests.filter(quest => quest.questId === '9')[0].totalFinished > 0,
    },
    {
      title: 'Arcade Station',
      url: '/testingYeet/questArcadeStation',
      finished: user.quests.filter(quest => quest.questId === '10')[0].totalFinished > 0,
    },
    {
      title: 'Neon Schminke',
      url: '/testingYeet/questNeonSchminke',
      finished: user.quests.filter(quest => quest.questId === '11')[0].totalFinished > 0,
    },
    {
      title: 'Grafitti Station',
      url: '/testingYeet/questGrafittiStation',
      finished: user.quests.filter(quest => quest.questId === '12')[0].totalFinished > 0,
    },
    {
      title: 'Auto Tuning',
      url: '/testingYeet/questAutoTuning',
      finished: user.quests.filter(quest => quest.questId === '13')[0].totalFinished > 0,
    },
    {
      title: 'Reaction Game',
      url: '/testingYeet/questReactionGame',
      finished: user.quests.filter(quest => quest.questId === '14')[0].totalFinished > 0,
    }
  ];

  const renderMainQuestEntry = (entry, index) => (
    <Box key={index} sx={{ borderBottom: `1px dashed ${theme.palette.primary.main}` }}>
      <Link sx={{ p: 2, display: 'inline-block', width: '100%', textDecoration: 'none', color: 'white' }} href={entry.url}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Gem size={50} type={entry.gemColor} sx={{ mr: 2 }} empty={!entry.finished} />
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
    <Box key={index} sx={{ borderBottom: `1px dashed ${theme.palette.primary.main}` }}>
      <Link sx={{ p: 2, display: 'inline-block', width: '100%', textDecoration: 'none', color: 'white' }} href={entry.url}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {entry.finished ? <StarFilledIcon fill={theme.palette.primary.main} /> : <StarOutlineIcon fill={theme.palette.primary.main} />}
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

  console.log('USR', user);

  const finishedQuestCount = user.quests.filter((quest) => quest.totalFinished > 0).length;
  const finishedMainQuestCount = user.quests.filter((quest) => quest.type === 'mainQuest' && quest.totalFinished > 0).length;
  const finishedSideQuestCount = user.quests.filter((quest) => quest.type === 'sideQuest' && quest.totalFinished > 0).length;

  return (
    <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest-Log</Typography>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>Quests</Typography>
          <Typography variant='h2'>{finishedQuestCount} / {user.quests.length}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>Deine Punktzahl</Typography>
          <Typography variant='h2'>{user.score.toLocaleString('de-DE', { minimumIntegerDigits: 6, useGrouping: true }) || '000.000'}</Typography>
        </Grid>
      </Grid>
      <Typography variant='h5' sx={{ mb: 1 }}>Main-Quests {finishedMainQuestCount}/{mainQuests.length}</Typography>
      {renderMainQuestList()}
      <Typography variant='h5' sx={{ mb: 1 }}>Side-Quests {finishedSideQuestCount}/{sideQuests.length}</Typography>
      {renderSideQuestList()}
    </Grid>
  )
}

export default QuestLog