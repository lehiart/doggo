import { db } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { opinionId: string } },
) {
  try {
    const { opinionId } = params

    await db.opinion.delete({
      where: {
        id: opinionId,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'DELETE_ONE_OPINION_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
