import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

// Server component
export async function GET(request: Request, context: { params: { code: string } }) {

  const prisma = new PrismaClient()
  try {
    const shortCode = context.params.code
    console.log(shortCode)
    const link = await prisma.link.findUniqueOrThrow({
      where: {
        shortCode: shortCode
      }
    })
    console.log(link.destination)
    return NextResponse.redirect(link.destination)

  } catch (e) {
    console.log(e)
    return (<h1>Yo</h1>)
  }
}