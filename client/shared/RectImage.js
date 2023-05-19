import Image from './Image'
import { Box } from '@mui/material'

const RectImage = ({ image }) => {
  return (<Box
    sx={{
      position: 'relative', pb: '56.25%', width: '100%',

    }}>
    <Box sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }}>
      <Image data={image} />
    </Box>
  </Box>)
}
export default RectImage