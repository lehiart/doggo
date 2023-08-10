import { db } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { companyId: string } },
) {
  try {
    const { companyId } = params

    if (!companyId) {
      return new NextResponse('Not found', { status: 404 })
    }

    const items = await db.item.findMany({
      where: {
        companyId,
      },
    })

    if (!items) {
      return new NextResponse('Not found', { status: 404 })
    }

    return NextResponse.json({ items })
  } catch (error) {
    console.error(error, 'GET_ITEMS_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
