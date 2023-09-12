import { db } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { userId, companyId, message, selectedItems } = body

  try {
    await db.request.create({
      data: {
        message,
        userId,
        companyId,
        selectedItems,
      },
    })

    ////////////////////////

    // Create 100 items with variations
    // const requestsToCreate = Array.from({ length: 100 }).map((_, index) => ({
    //   message: `${message} - ${index + 1}`, // Add a unique identifier to each message
    //   userId,
    //   companyId,
    //   selectedItems,
    // }))

    // await db.request.createMany({
    //   data: requestsToCreate,
    // })

    ////////////////////

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'CREATE_CLIENT_REQUEST_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
