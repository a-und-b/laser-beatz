import qs from 'qs'

export const getApiUrl = (path = '') => {
  return 'http://localhost:3004/v1' + path
}

export const fetchApi = async (path, urlParams = {}, options = {}) => {
  const token = '';
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', 
    }
  }
  const mergedOptions = {
    ...defaultOptions, ...options,
  }

  
  // Request URL
  const query = qs.stringify(urlParams)
  const requestUrl = `${getApiUrl(
    `/${path}${query ? '?' + query : ''}`)}`

  const response = await fetch(requestUrl, mergedOptions)

  if (!response.ok) {
    console.error(response.statusText, path)
    throw new Error('fetch failed at ' + path)
  }

  return await response.json()
}

export const getUser = async (userId) => {
  const userData = await fetchApi(`users/${userId}`);
  localStorage.setItem('laserbeatz-user', JSON.stringify(userData));
  return userData;
}
export const updateUser = async (user) => {
  await fetchApi(`users/${user.userId}`, {}, {
    method: 'PATCH',
    body: JSON.stringify(user)
  });
  localStorage.setItem('laserbeatz-user', JSON.stringify(user));
}
