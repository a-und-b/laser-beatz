import {Box, Typography} from '@mui/material'
import ReactMarkdown from 'react-markdown'
import Button from '@mui/material/Button'

const RichText = ({children, variant = 'body1', sx = {}, ...props}) => {

  const getLink = ({href, children}) => {

    if (href === 'link') {
      href = children[0]
    }
    href = href.trim()

    if (href.startsWith('http')) {
      return href
    }
    if (href.startsWith('www')) {
      return `https://${href}`
    }
    return href
  }

  const defaultOptions = {
    component: 'div', variant,
  }

  const mergedOptions = {
    ...defaultOptions, ...props.options,
  }

  return (<Typography component={mergedOptions.component}
                      variant={mergedOptions.variant} {...mergedOptions}>
    <ReactMarkdown components={{
      ol: ({node, ...props}) => <Box sx={{px: 2, py: 1}}
                                     component={'ol'} {...props}/>,
      ul: ({node, ...props}) => <Box sx={{px: 2, py: 1}}
                                     component={'ul'} {...props}/>,
      li: ({node, ...props}) => <Box sx={{mb: 1}} component={'li'} {...props}/>,
      h2: ({node, ...props}) => <Typography variant={'h2'} {...props}/>,
      h3: ({node, ...props}) => <Typography variant={'h3'} {...props} sx={{
        ...props.sx, mt: 6, ':first-child': {mt: 0},
      }}/>,
      h4: ({node, ...props}) => <Typography variant={'h4'} {...props}/>,
      h5: ({node, ...props}) => <Typography variant={'h5'} {...props}/>,
      img: ({node, ...props}) => <Box
          sx={{position: 'relative'}}><img {...props}/></Box>,
      a: ({node, ...props}) => {
        console.log('a props:', props)
        return (<Box>
          <Button sx={{my: 1, display: 'inline-block', ...sx}} component={'a'}
                  target={'_blank'} href={getLink(props)}
                  variant={'contained'}>
            {props.children[0]}
          </Button>
        </Box>)
      },
      u: ({node, ...props}) => <Typography
          sx={{textDecoration: 'underline', ...sx}} {...props}
          variant={'body1'}/>,
      p: ({node, ...props}) => <Typography
          variant={mergedOptions.variant} {...props}
          sx={{mb: 3, ...sx}}/>,

    }}>
      {children}
    </ReactMarkdown></Typography>)

}
export default RichText