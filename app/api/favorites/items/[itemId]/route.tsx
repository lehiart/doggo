import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } },
) {
  const { itemId } = params
  const session = await getServerSession(authOptions)

  try {
    // remove item from favorites using the itemId and userId
    await db.favoriteItems.deleteMany({
      where: {
        AND: [
          { userId: session?.user?.id },
          { items: { some: { id: itemId } } },
        ],
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'REMOVE_FROM_FAVORITES_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
