import { NextResponse } from 'next/server';

// THe main url
export async function GET(request: Request, context: { params: any }) {

  // find with

  console.log(context.params)
  console.log('aaaaaaa')
  // await prisma.link.findUniqueOrThrow({where: {
  //   shortCode: request.
  // }})
 
  return NextResponse.json({ 'message': 'I am the KING' });
}