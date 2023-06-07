import { nanoid } from 'nanoid';
import validator from 'validator';
import { URLList, URLListItem } from '../../types/Local';

export async function shortenURL(originalURL: string): Promise<{message: string, destination: string, short: string}> {
  // Verify url
  const serverURL = `/api/link`;

  const isValid = validateURL(originalURL);
  if(!isValid) {
    console.log('Invalid URL!!!!!!')
    throw new Error('Invalid URL')
  }
  

  const data = {
    url: originalURL,
    uid_key: getUIDKey()
  }

  try {
    const res = await fetch(serverURL, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if(res.ok) {
      const data: {message: string, destination: string, short: string, pageTitle: string} = await res.json()
      addURLToList(data.short, data.destination, data.pageTitle)
      return data
    }else{
      throw new Error('There was a problem creating the url')
    }
    

    

    
  } catch(e) {
    console.log(e)
    return Promise.reject(e)
  }
  
}


function addURLToList(short: string, destination: string, title: string) {
  let urlList = getURLList()

  // Add new url
  const urlItem: URLListItem = {
    createdAt: new Date(),
    shortURL: short,
    destination: destination,
    pageTitle: title
  }

  console.log(urlItem)
  urlList.push(urlItem)
  localStorage.setItem('url_list', JSON.stringify(urlList))
}

export function getURLList(): URLList {
  let urlList: URLList = []
  try {
    const urlListString = localStorage.getItem('url_list');
    if(urlListString !== null) {
      const urlListData = JSON.parse(urlListString) as URLList;
      urlList = urlListData
    }
  
    return urlList;
  } catch(e) {
    return []
  }
  
}

function createUIDKey(): string {
  // Create a key and save to localstorage
  const uidKey = nanoid(255)
  localStorage.setItem('uid_key', uidKey)
  return uidKey;
}

function getUIDKey(): string {
  // Check localstorage to see if there is a key
  const uidKey = localStorage.getItem('uid_key')

  if(uidKey !== null && uidKey.length === 255) {
    return uidKey;
  }
  // Create a new key
  return createUIDKey()
}

// check if valid url
function validateURL(url: any): {status: boolean, message: string} {
  if(typeof url !== 'string') {
    return {
      status: true,
      message: 'Not a valid URL'
    }
  }

  const isURL = validator.isURL(url, {
    allow_underscores: true,
  })
  if(!isURL) {
    return {
      status: false,
      message: 'Not a valid URL'
    }
  }

  return {
    status: true,
    message: "Success"
  }
}
function removeFromList(url: string) {
  let urlList = getURLList()

  // Add new url
  const newList = urlList.filter((item) => {
    if(item.shortURL !== url) {
      return true
    }else {
      return false
    }
  })

  localStorage.setItem('url_list', JSON.stringify(newList))
}

export async function removeURL(url: string) {
  // Get key
  console.log(getUIDKey())
  const data = {
    url: url,
    uid_key: getUIDKey()
  }

  try {
    const res = await fetch('/api/link', {
      method: 'PUT',
      body: JSON.stringify(data)
    })

    if(res.ok) {
      removeFromList(url)
      
      return Promise.resolve(true)
    }else{
      return Promise.reject()
    }
  } catch (e) {
    return Promise.reject()
  }
  

  // Send delete to server

  // If success then remove from list
}