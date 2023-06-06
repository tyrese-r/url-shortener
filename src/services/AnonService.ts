import validator from 'validator';

export async function shortenURL(originalURL: string) {
  // Verify url
  const serverURL = `/api/link`;

  const isValid = validateURL(originalURL);
  if(!isValid) {
    console.log('Invalid URL!!!!!!')
    throw new Error('Invalid URL')
  }

  const data = {
    url: originalURL
  }

  try {
    const res = await fetch(serverURL, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const {message}: {message: string} = await res.json()

    return {
      url: message
    }
  } catch(e) {
    console.log(e)
    return Promise.reject(e)
  }
  
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