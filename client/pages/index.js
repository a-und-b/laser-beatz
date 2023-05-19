import { Box, Grid, Typography, useTheme } from "@mui/material"

const Main = ({ }) => {
  const theme = useTheme()

  const renderList = () => (
    <Box sx={{ border: `1px dashed ${theme.palette.primary.main}`, borderRadius: '5px', mb: 5 }}>
      <Box sx={{ p: 3, borderBottom: `1px dashed ${theme.palette.primary.main}` }}>
        <Typography variant='h3'>Quest-Log</Typography>
      </Box>
      <Box sx={{ p: 3, borderBottom: `1px dashed ${theme.palette.primary.main}` }}>
        <Typography variant='h3'>Live-Highscore</Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography variant='h3'>Zeitplan</Typography>
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
          <Typography variant='h2'>000.000</Typography>
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