import { PrismaClient } from '@prisma/client'
import validator from 'validator';
import { customAlphabet } from 'nanoid'
import { parse } from 'node-html-parser';

export async function POST(request: Request) {

  const { url, uid_key } = await request.json();
  const isValid = validateURL(url)
  if(isValid.status) {
    try {
      const title = await getTitle(url)
      console.log(title)
      const shortCode = await createLink(url, uid_key, title)
      const shortURL = `${process.env.LINK_PATH}${shortCode}`
      return new Response(JSON.stringify({message: `Created URL!`, short: shortURL, destination: url, pageTitle: title}), {status: 200})
    } catch(e) {
      return new Response(JSON.stringify({message: 'Could not create link'}), {status: 500})
    }
    
    
  }else{
    return new Response(JSON.stringify({'message': isValid.message}), {status: 400})

  }

}

export async function PUT(request: Request) {

  const { url, uid_key } = await request.json();
  
  if(!uid_key) return new Response(JSON.stringify({'message': "Not authenticated"}), {status: 401})
  try {
    await deleteLink(url, uid_key)
    return new Response(null, {status: 204})
  } catch(e) {
    return new Response(JSON.stringify({message: 'Could not delete'}), {status: 500})
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
    allow_underscores: true
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

async function createLink(url: string, userIdentifier: string, pageTitle: string): Promise<string> {
  // generate back half
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, 6);

  const code = nanoid()

  const prisma = new PrismaClient();
  try {
    await prisma.link.create({
      data: {
        shortCode: code,
        destination: url,
        userIdentifier: userIdentifier,
        pageTitle: pageTitle,
      }
    })
  } catch (e) {
    console.log(e)
    Promise.reject(e)
  }
  return code
  
}

async function getTitle(url: string): Promise<string> {
  // Get url title as fallback
  const urlTitle = new URL(url).hostname
  try {
    const res = await fetch(url)
    const html = await res.text()
    const doc = parse(html);
    if(!doc) throw new Error('No doc')
    const titleElement = doc.querySelector('title')
    const title = titleElement?.innerText ?  titleElement.innerText : urlTitle
    return getLimitedText(title);
  } catch {
    return getLimitedText(urlTitle)
  }
}

async function deleteLink(url: string, uid_key: string) {
  // Get the end part
  try {
    const shortCode = new URL(url).pathname.replace('/', '');
    const prisma = new PrismaClient();
  
    const link = await prisma.link.findFirst({
      where: {

        shortCode: shortCode,
      },
      
    })

    if(!link) {
      return Promise.reject('Not found')
    }
    if(link.userIdentifier !== uid_key) {
      return Promise.reject('Not authenticated')
    }
    await prisma.link.delete({
      where: {
        id: link.id
      }
    })
    console.log('DELETED')
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
  

  return Promise.resolve(true)

}

function getLimitedText(text: string) {
  if (text.length <= 255) {
    return text;
  } else {
    return text.slice(0, 255);
  }
}