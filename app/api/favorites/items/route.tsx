import { db } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { userId, itemId } = body

  try {
    await db.favoriteItems.update({
      where: {
        userId,
      },
      data: {
        items: {
          connect: {
            id: itemId,
          },
        },
      },
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'ADD_TO_FAVORITES_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
