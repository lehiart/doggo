import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { itemId: string } },
) {
  const { itemId } = params

  if (!itemId) {
    return new Response(null, { status: 400 })
  }

  try {
    await db.item.update({
      where: {
        id: itemId,
      },
      data: {
        published: true,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'PUBLISH_ITEM_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
