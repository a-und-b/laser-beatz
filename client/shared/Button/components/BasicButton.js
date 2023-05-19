import {useRouter} from 'next/router'
import MuiButton from '@mui/material/Button'

const BasicButton = ({
  name, href, page, color = 'primary', variant = 'contained', ...props
}) => {

  const router = useRouter()

  color = color === 'default' ? 'primary' : color

  const handleClick = () => {
    if (href !== null && href.length !== 0) {
      return window.open(href, '_blank')
    }

    router.push(page.data.attributes.slug)
  }

  return (<MuiButton variant={variant} color={color} onClick={handleClick}
                     sx={{mt: 3}}>{name}</MuiButton>)
}
export default BasicButton