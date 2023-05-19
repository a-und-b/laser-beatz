import NextImage from 'next/image'
import {Box, CircularProgress, Stack, Typography} from '@mui/material'
import {TypeSpecimenOutlined} from '@mui/icons-material'

const Image = ({data: images, ...props}) => {
  if (images === undefined || images.data === undefined || images.data ===
      null || images.data.length === 0) {
    return null
  }

  const getStrapiThumbnail = data => data.attributes.formats.thumbnail.url

  const {data} = images

  if (!Array.isArray(images.data)) {
    return (<Box sx={{
      position: 'relative', width: '100%', height: '100%',
    }}><NextImage src={data.attributes.url}
                  layout={'fill'}
                  placeholder={'blur'}
                  blurDataURL={getStrapiThumbnail(data)}
                  objectFit={'cover'}
                  {...props}
    />
    </Box>)
  }

  //if (data.length === 1) {
  const image = data[0]

  const {alternativeText, url} = image.attributes

  return (<Box sx={{
    position: 'relative', width: '100%', height: '100%',
  }}>
    <NextImage
        src={url}
        alt={alternativeText}
        objectFit={'cover'}
        layout={'fill'}
        placeholder={'blur'}
        blurDataURL={getStrapiThumbnail(image)}
        {...props}
    />
  </Box>)
  //}

  // TODO add slider

  return (<Box sx={{
    position: 'relative', width: '100%', height: '100%',
  }}>
    <Stack alignItems={'center'} justifyContent={'Center'}>
      <Typography variant={'h6'}>Slider in Progress</Typography>
      <CircularProgress/>
    </Stack>
  </Box>)

}
export default Image