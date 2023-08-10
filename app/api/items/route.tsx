import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { userId, companyId, title, description, category } = body

  // Ensure user is authenticated and has access to this user.
  const session = await getServerSession(authOptions)
  if (!session?.user || userId !== session?.user.id) {
    return new Response(null, { status: 403 })
  }

  try {
    await db.item.create({
      data: {
        title,
        description,
        company: {
          connect: { id: companyId },
        },
        category: {
          connect: { id: category[0] },
        },
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'CREATE_ITEM_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { userId, itemId, title, description, category } = body

  // Ensure user is authenticated and has access to this user.
  const session = await getServerSession(authOptions)
  if (!session?.user || userId !== session?.user.id) {
    return new Response(null, { status: 403 })
  }

  try {
    await db.item.update({
      where: {
        id: itemId,
      },
      data: {
        title,
        description,
        category: {
          connect: { id: category[0] },
        },
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'UPDATE_ITEM_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
