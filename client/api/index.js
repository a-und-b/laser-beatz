import qs from 'qs'

export const getStrapiUrl = (path = '') => {
  return ''
}

export const fetchApi = async (path, urlParams = {}, options = {}) => {
  const defaultOptions = {
    'Content-Type': 'application/json',
  }
  const mergedOptions = {
    ...defaultOptions, ...options,
  }

  // Request URL
  const query = qs.stringify(urlParams)
  const requestUrl = `${getStrapiUrl(
      `/api/${path}${query ? '?' + query : ''}`)}`

  const response = await fetch(requestUrl, mergedOptions)

  if (!response.ok) {
    console.error(response.statusText, path)
    throw new Error('fetch failed at ' + path)
  }

  return await response.json()
}
