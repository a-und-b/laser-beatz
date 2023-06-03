import { Box, Button, Grid, Link, Typography, useTheme } from "@mui/material"
import { useContext, useEffect } from "react";
import { GlobalContext } from "../provider/GlobalProvider";
import NextImage from 'next/image'
import StarFilledIcon from "../shared/Icons/StarFilled";
import StarOutlineIcon from "../shared/Icons/StarOutline";
import Gem from "../shared/Other/Gem";
import { useRouter } from "next/router";
import HomeButton from "../shared/Other/HomeButton";
import { getPrimaryColor } from "../lib/theme";
import { isEmpty } from "lodash";

const QuestLog = ({ }) => {
  const theme = useTheme();
  const { user } = useContext(GlobalContext);
  const router = useRouter();

  console.log('USER', user);

  useEffect(() => {
    if (isEmpty(user)) {
      // router.push('/scanUser');
    }
  }, [user]);

  if (!user || !user.quests) {
    return '';
  };


  const mainQuests = [
    {
      title: 'Dream Decoder',
      url: '/questDreamDecoder',
      finished: user.quests.filter(quest => quest.questId === '1')[0].totalFinished > 0,
      gemColor: 'emerald',
    },
    {
      title: 'Digital District',
      url: '/questDigitalDistrict',
      finished: user.quests.filter(quest => quest.questId === '2')[0].totalFinished > 0,
      gemColor: 'ember',
    },
    {
      title: 'Crypto Station',
      url: '/questCryptoStation',
      finished: user.quests.filter(quest => quest.questId === '3')[0].totalFinished > 0,
      gemColor: 'ruby',
    }
  ];

  const sideQuests = [
    {
      title: 'Future Lab',
      url: '/questFutureLab',
      finished: user.quests.filter(quest => quest.questId === '8')[0].totalFinished > 0,
    },
    {
      title: 'Manga-Corner',
      url: '/questMangaCorner',
      finished: user.quests.filter(quest => quest.questId === '9')[0].totalFinished > 0,
    },
    {
      title: 'Neon Schminke',
      url: '/questNeonSchminke',
      finished: user.quests.filter(quest => quest.questId === '11')[0].totalFinished > 0,
    },
    {
      title: 'Bändchen abholen',
      url: '/questBaendchen',
      finished: user.quests.filter(quest => quest.questId === '5')[0].totalFinished > 0,
    },
    {
      title: 'Komm im Cosplay',
      url: '/questCosplay',
      finished: user.quests.filter(quest => quest.questId === '6')[0].totalFinished > 0,
    },
    {
      title: 'Dein Musikwunsch',
      url: '/questDeinMusikwunsch',
      finished: user.quests.filter(quest => quest.questId === '7')[0].totalFinished > 0,
    },
    {
      title: 'Lass dich fotografieren',
      url: '/questFoto',
      finished: user.quests.filter(quest => quest.questId === '15')[0].totalFinished > 0,
    },
    {
      title: 'Reaction Game',
      url: '/questReactionGame',
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
      <Link sx={{ p: 2, display: 'inline-block', width: '100%', textDecoration: 'none', color: 'white' }} href={entry.finished ? null : entry.url}>
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

  const handleClick = () => {
    router.push('/scan')
  }

  const now = (new Date()).getTime();
  const startFinal = (new Date(2023, 5, 3, 20, 15)).getTime();
  const isFinal = true; // now > startFinal;

  return (
    <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Quest-Log</Typography>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ mb: 1 }}>Quests</Typography>
          <Typography variant='h2'>{finishedQuestCount} / {mainQuests.length + sideQuests.length + 1}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ mb: 1 }}>Deine Punktzahl</Typography>
          <Typography variant='h2'>{user.score.toLocaleString('de-DE', { minimumIntegerDigits: 6, useGrouping: true }) || '000.000'}</Typography>
        </Grid>
      </Grid>
      {
        isFinal && (
          <>

            <Box sx={{ border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px', mb: 4 }}>
              <Link sx={{ p: 2, display: 'inline-block', width: '100%', textDecoration: 'none', color: 'white' }} href={'/questFinal'}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h3' sx={{ ml: 1 }}>
                    <StarFilledIcon fill={theme.palette.primary.main} />
                    <span style={{ marginLeft: '12px' }}>
                      Finale Abstimmung
                    </span>
                  </Typography>
                </Box>
              </Link>
            </Box>
          </>
        )
      }
      {
        finishedMainQuestCount >= mainQuests.length && (
          <>
            <Typography sx={{ mb: 3 }}><span style={{ color: getPrimaryColor('emerald') }}>Glückwunsch!</span> Du hast dich wacker geschlagen. Melde dich nun an der Saftbar um dir deine wohlverdiente Belohnung abzuholen!</Typography>
            <Box sx={{ border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px', mb: 4 }}>
              <Link sx={{ p: 2, display: 'inline-block', width: '100%', textDecoration: 'none', color: 'white' }} href={'/questPioneers'}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h3' sx={{ ml: 1 }}>
                    <StarFilledIcon fill={theme.palette.primary.main} />
                    <span style={{ marginLeft: '12px' }}>
                      Join the Pioneers
                    </span>
                  </Typography>
                </Box>
              </Link>
            </Box>
          </>
        )
      }
      <Typography variant='h5' sx={{ mb: 1 }}>Main-Quests <span style={{ color: finishedMainQuestCount >= mainQuests.length ? getPrimaryColor('emerald') : null }}>{finishedMainQuestCount}/{mainQuests.length}</span></Typography>
      {renderMainQuestList()}
      <Typography variant='h5' sx={{ mb: 1 }}>Side-Quests {finishedSideQuestCount}/{sideQuests.length}</Typography>
      {renderSideQuestList()}
      <Typography variant='h5' sx={{ mb: 1 }}>Extra</Typography>
      <Box sx={{ border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px' }}>
        <Link sx={{ p: 2, display: 'inline-block', width: '100%', textDecoration: 'none', color: 'white' }} href={'/questBonus'}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h5' sx={{ ml: 2 }}>Bonuspunkte</Typography>
          </Box>
        </Link>
      </Box>

      <Box sx={{ mb: 15 }} />
      {/* <Box sx={{ py: 2, px: 2, display: 'flex', position: 'fixed', width: '100%', bottom: 0, left: 0, background: theme.palette.secondary.dark }}>
        <HomeButton />
        <Button variant='contained' onClick={handleClick} sx={{ flexGrow: 1, py: 1, px: 3, ml: 1 }}>Quest-Code scannen</Button>
      </Box> */}
    </Grid>
  )
}

export default QuestLog