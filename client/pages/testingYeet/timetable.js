import { Box, Grid, Typography, useTheme } from "@mui/material";

const Timetable = () => {
    const theme = useTheme();
    const timetable = [
        {
            time: "16:00 Uhr",
            event: "Einlass"
        },
        {
            time: "16:30 Uhr",
            event: "Begrüßung + Start"
        },
        {
            time: "20:30 Uhr",
            event: "Siegerehrung"
        },
        {
            time: "21:00 Uhr",
            event: "Neon-Party"
        },
        {
            time: "23:00 Uhr",
            event: "Lights down"
        }
    ];
    return (
        <Grid sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h2' sx={{ mb: 3, color: theme.palette.primary.main }}>Zeitplan</Typography>
            {
                timetable.map((entry, index) => (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pb:2, borderBottom: `1px dashed ${theme.palette.primary.main}`, mb:2 }} key={index}>
                        <Typography variant='h4'>{entry.time}</Typography>
                        <Typography variant='h4'>{entry.event}</Typography>
                    </Box>
                ))
            }
        </Grid>
    )
}

export default Timetable;