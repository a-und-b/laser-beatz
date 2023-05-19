import BasicButton from './components/BasicButton'
import {Box, Stack} from '@mui/material'

const Button = ({data}) => {

  if (data === undefined) {
    return null
  }

  if (Array.isArray(data)) {

    return (<Stack direction={'row'} spacing={3}>
      {data.map(button => <Box key={button.id}>
        <BasicButton {...button}/>
      </Box>)}
    </Stack>)

  }

  return (<BasicButton {...data}/>)

}
export default Button