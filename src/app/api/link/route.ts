import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import validator from 'validator';
import { customAlphabet } from 'nanoid'

export async function POST(request: Request, response: Response) {

  const prisma = new PrismaClient()

  console.log(request.body);
  const { url } = await request.json();
  console.log(url)
  const isValid = validateURL(url)
  if(isValid.status) {
    console.log('Nope')
    try {
      const shortCode = await createLink(url)
      return new Response(JSON.stringify({message: `${process.env.LINK_PATH}${shortCode}`}), {status: 200})
    } catch(e) {
      return new Response(JSON.stringify({message: 'Could not create link'}), {status: 500})
    }
    
    
  }else{
    return new Response(JSON.stringify({'message': isValid.message}), {status: 400})

  }
  // Get code from url
  // prisma.link.create({
  //   data: {
  //     shortCode:"", // random
  //     destination: 
  //   }
  // })

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

async function createLink(url: string): Promise<string> {
  // generate back half
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, 6);

  const code = nanoid()
  console.log(code)

  const prisma = new PrismaClient();
  try {
    const link = await prisma.link.create({
      data: {
        shortCode: code,
        destination: url
      }
    })
  } catch (e) {
    console.log(e)
    Promise.reject(e)
  }
  return code
  
}