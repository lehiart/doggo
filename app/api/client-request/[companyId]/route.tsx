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

    const clientRequests = await db.request.findMany({
      where: {
        companyId,
      },
    })

    if (!clientRequests) {
      return new NextResponse('Not found', { status: 404 })
    }

    return NextResponse.json({ clientRequests })
  } catch (error) {
    console.error(error, 'GET_COMPANY_CLIENT_REQUESTS_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
