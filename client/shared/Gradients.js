import { Box, useTheme } from '@mui/material'

const Gradients = ({ children, variant = 1, ...props }) => {

  const theme = useTheme()
  const getGradient = () => {
    switch (variant) {
      case 1:
        return `linear-gradient(45deg,${theme.palette.primary.light}7D 50%,#fff,${theme.palette.secondary.light}7D)`
      case 2:
        return `linear-gradient(-33deg,${theme.palette.secondary.main}1C 50%,${theme.palette.primary.main}8A)`
    }
  }

  return (<Box {...props} sx={{
    ...props.sx, background: getGradient(),
  }}>
    {children}
  </Box>)
}
export default Gradients