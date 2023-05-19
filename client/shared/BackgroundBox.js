import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'

const BackgroundBox = ({ data, children, ...props }) => {
  const theme = useTheme()
  const getBackground = () => {
    if (data === undefined || data === null) {
      return 'inherit'
    }

    const { color } = data
    switch (color) {
      case 'primary':
        return theme.palette.primary.main
      case 'secondary':
        return theme.palette.secondary.main
      case 'grey':
        return theme.palette.grey['300']

      // TODO add gradients
      case 'gradient 1':
        return `linear-gradient(45deg,${theme.palette.primary.light}7D 50%,#fff,${theme.palette.secondary.light}7D)`

      default:
        return 'inherit'
    }
  }

  const bgColor = getBackground()

  return (<Box {...props} sx={{
    background: bgColor,
    color: data?.color === 'primary' ? '#fff' : 'inherit',
    py: bgColor === 'inherit' ? 0 : 12, ...props.sx,
  }}>
    {children}
  </Box>)

}
export default BackgroundBox