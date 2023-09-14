import { db } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { rating, comment, name, itemId, companyId, userId } = body

    if (!companyId || !itemId || !userId) {
      return new NextResponse('Not found', { status: 404 })
    }

    const opinionExist = await db.opinion.findFirst({
      where: {
        itemId: itemId,
        companyId: companyId,
        userId: userId,
      },
    })

    if (opinionExist) {
      await db.opinion.update({
        where: {
          id: opinionExist.id,
        },
        data: {
          rating,
          comment,
          updatedAt: new Date(),
        },
      })
    } else {
      await db.opinion.create({
        data: {
          rating,
          comment,
          itemName: name,
          itemId,
          company: {
            connect: { id: companyId },
          },
          user: {
            connect: { id: userId },
          },
        },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'CREATE_ONE_OPINION_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { opinionId, rating, comment } = body

    if (!opinionId) {
      return new Response(null, { status: 403 })
    }

    await db.opinion.update({
      where: {
        id: opinionId,
      },
      data: {
        rating,
        comment,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'UPDATE_ONE_OPINION_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
