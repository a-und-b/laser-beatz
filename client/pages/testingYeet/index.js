import { Box, Grid, Link, Typography, useTheme } from "@mui/material"
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../provider/GlobalProvider";
import { isEmpty } from "lodash";
import NextImage from 'next/image'
import ScrollIcon from "../../shared/Icons/Scroll";
import TrophyIcon from "../../shared/Icons/Trophy";
import HourglassIcon from "../../shared/Icons/Hourglass";
import SparklesIcon from "../../shared/Icons/Sparkles";
import QuestionIcon from "../../shared/Icons/Question";

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
      icon: <ScrollIcon fill={theme.palette.primary.main} />,
      url: '/testingYeet/questLog'
    },
    {
      title: 'Live-Highscore',
      icon: <TrophyIcon fill={theme.palette.primary.main} />,
      url: '/testingYeet/scoreboard',
    },
    {
      title: 'Zeitplan',
      icon: <HourglassIcon fill={theme.palette.primary.main} />,
      url: '/testingYeet/timetable'
    }
  ]

  const listElements2 = [
    {
      title: 'Neuigkeiten',
      icon: <SparklesIcon fill={theme.palette.primary.main} />,
      url: '/testingYeet/news'
    },
    {
      title: 'Hilfe und Info',
      icon: <QuestionIcon fill={theme.palette.primary.main} />,
      url: '/testingYeet/helpInfo'
    },
    {
      title: 'Zeitplan',
      icon: <HourglassIcon fill={theme.palette.primary.main} />,
      url: '/timetable'
    }
  ]

  const renderListElement = (entry, index) => (
    <Box sx={{ borderBottom: `1px dashed ${theme.palette.primary.main}` }} key={index}>
        <Link href={entry.url} sx={{ p: 2, display: 'inline-block', width: '100%', textDecoration: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {entry.icon}
            {/* <NextImage src={entry.iconSrc} width={40} height={40} style={{ zIndex: -1 }} /> */}
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
          <Typography variant='h2'>{user.score.toLocaleString('de-DE', { minimumIntegerDigits: 6, useGrouping: true })}</Typography>
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