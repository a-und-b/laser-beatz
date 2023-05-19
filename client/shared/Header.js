import { Box, Typography } from '@mui/material'

const Header = ({
  overline, headline, subline, variant = 'h2', component = 'h2', textAlign = 'left', ...props
}) => {
  return (<Box
    {...props}
    sx={{
      mb: 3, ...props.sx,
    }}>
    {overline && <Typography variant={'overline'} textAlign={textAlign}>{overline}</Typography>}
    <Typography variant={variant} component={component} textAlign={textAlign}>{headline}</Typography>
    {subline &&
    <Typography variant={'h6'} component={'p'} textAlign={textAlign}>{subline}</Typography>}
  </Box>)
}

export default Header