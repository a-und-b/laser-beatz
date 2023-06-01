import { Box } from '@mui/material'
import NextImage from 'next/image'
import { useRouter } from 'next/router'

const Logo = () => {

  const router = useRouter()

  const handleClick = () => {
    router.push('/main')
  }

  return (<Box onClick={handleClick} sx={{
    py: 1, position: 'relative', width: 200, height: 70,
  }}>
    <NextImage src={'/img/logo.png'}
               layout={'fill'} objectFit={'contain'}
               alt={'Radiologie Nuklearmedizin' + ' Adickesallee'}/>
  </Box>)
}
export default Logo