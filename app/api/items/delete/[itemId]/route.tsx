import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } },
) {
  try {
    const { itemId } = params

    // Check if the user has access to this pack member.
    if (!(await verifySelectedCompanyHasAccessToItem(itemId))) {
      return new Response(null, { status: 403 })
    }

    await db.item.delete({
      where: {
        id: itemId,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'DELETE_ITEM_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}

async function verifySelectedCompanyHasAccessToItem(itemId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.user.count({
    where: {
      id: session?.user.id,
      companies: {
        some: {
          items: {
            some: {
              id: itemId,
            },
          },
        },
      },
    },
  })

  return count > 0
}
