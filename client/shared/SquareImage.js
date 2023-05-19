import Image from './Image'
import { Box } from '@mui/material'

const SquareImage = ({ image, variant = 'square' }) => {

  return (<Box
    sx={{
      position: 'relative', pb: '100%', width: '100%',

    }}>
    <Box sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: variant === 'square' ? 0 : '100%',
    }}>
      <Image data={image}/>
    </Box>
  </Box>)
}
export default SquareImage