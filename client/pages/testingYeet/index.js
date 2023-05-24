import { Box, Grid, Link, Typography, useTheme } from "@mui/material"
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../provider/GlobalProvider";
import { isEmpty } from "lodash";
import NextImage from 'next/image'

const Main = ({ }) => {
  const theme = useTheme();
  const { user } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (isEmpty(user)) {
      router.push('/testingYeet/scanUser');
    }
  }, [user]);

  if (isEmpty(user)) {
    return '';
  }

  const finishedQuestCount = user.quests.filter((quest) => quest.totalFinished > 0).length;

  const listElements1 = [
    {
      title: 'Quest-Log',
      iconSrc: '/img/icons/scroll.svg',
      url: '/testingYeet/questLog'
    },
    {
      title: 'Live-Highscore',
      iconSrc: '/img/icons/trophy.svg',
      url: '/testingYeet/scoreboard',
    },
    {
      title: 'Zeitplan',
      iconSrc: '/img/icons/hourglass-clock.svg',
      url: '/testingYeet/timetable'
    }
  ]

  const listElements2 = [
    {
      title: 'Neuigkeiten',
      iconSrc: '/img/icons/scroll.svg',
      url: '/testingYeet/news'
    },
    {
      title: 'Hilfe und Info',
      iconSrc: '/img/icons/trophy.svg',
      url: '/testingYeet/helpInfo'
    },
    {
      title: 'Zeitplan',
      iconSrc: '/img/icons/hourglass-clock.svg',
      url: '/timetable'
    }
  ]

  const renderListElement = (entry, index) => (
    <Box sx={{ borderBottom: `1px dashed ${theme.palette.primary.main}` }} key={index}>
        <Link href={entry.url} sx={{ p: 2, display: 'inline-block', width: '100%', textDecoration: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NextImage src={entry.iconSrc} width={40} height={40} style={{ zIndex: -1 }} />
            <Typography variant='h3' sx={{ ml: 2, color: 'white', }}>{entry.title}</Typography>
          </Box>
        </Link>
      </Box>
  )


  const renderList = (listElements) => (
    <Box sx={{ border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px', mb: 5 }}>
      {listElements.map((entry, index) => renderListElement(entry, index,))}
    </Box>
  );

  return (
    <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Hauptmenü</Typography>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>Quests</Typography>
          <Typography variant='h2'>{finishedQuestCount} / {user.quests.length}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>Deine Punktzahl</Typography>
          <Typography variant='h2'>{user.score}</Typography>
        </Grid>
      </Grid>
      <Typography variant='h3' sx={{ mb: 1}}>Abenteuer</Typography>
      {renderList(listElements1)}
      <Typography variant='h3' sx={{ mb: 1}}>Drumherum</Typography>
      {renderList(listElements2)}
    </Grid>
  )
}

export default Main