import { Box } from '@mui/material'
import Image from './Image'

const BackgroundImage = ({ image }) => {
  return (<Box sx={{
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
  }}>
    <Image data={image}/>
  </Box>)
}
export default BackgroundImage