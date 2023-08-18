import { db } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { userId, companyId, message, selectedItems } = body

  console.log(body, 'BODY')

  try {
    await db.request.create({
      data: {
        message,
        userId,
        companyId,
        selectedItems,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'CREATE_CLIENT_REQUEST_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
