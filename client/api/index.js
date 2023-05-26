import qs from 'qs'

export const getApiUrl = (path = '') => {
  return process.env.API_URL + '/v1' + path
}

export const fetchApi = async (path, urlParams = {}, options = {}) => {
  const token = process.env.TOKEN;
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', 
    }
  };
  const mergedOptions = {
    ...defaultOptions, ...options,
  };

  
  // Request URL
  const query = qs.stringify(urlParams)
  const requestUrl = `${getApiUrl(
    `/${path}${query ? '?' + query : ''}`)}`

  alert(requestUrl);

  const response = await fetch(requestUrl, mergedOptions)
  alert('RESPONSE ??');

  if (!response.ok) {
    alert('RESPONSE PROBLEM');
    console.error(response.statusText, path)
    throw new Error('fetch failed at ' + path)
  }

  return await response.json()
}

export const getUser = async (userId) => {
  alert(`GET USER DATA...`);
  const userData = await fetchApi(`users/${userId}`, {}, {
    method: 'GET',
  });
  alert(`GOT USER DATA, ${userData.username}`);
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

export const getHighScoreList = async () => {
 const highScoreData = await fetchApi('users/highscore?sortBy=score:desc&limit=30&page=1'); 
 return highScoreData;
}

export const updateQuest = async (user, quest) => {
  if (!quest.userInput) quest.userInput = {};
  const questData = { quest };
  console.log('BODY', JSON.stringify(questData));
  const userData = await fetchApi(`users/${user.userId}/quest`, {}, {
    method: 'PATCH',
    body: JSON.stringify(questData)
  });

  localStorage.setItem('laserbeatz-user', JSON.stringify(userData));
  return userData;
}
