import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

// THe main url
export async function GET(request: Request, context: { params: any }) {

  const prisma = new PrismaClient()
  // find with

  console.log(context.params)
  console.log('aaaaaaa')
  // await prisma.link.findUniqueOrThrow({where: {
  //   shortCode: request.
  // }})
 
  return NextResponse.json({ 'message': 'I am the KING' });
}