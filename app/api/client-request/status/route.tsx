import { db } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { requestId, status } = body

  try {
    await db.request.update({
      where: {
        id: requestId,
      },
      data: {
        status,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'CREATE_CLIENT_REQUEST_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
