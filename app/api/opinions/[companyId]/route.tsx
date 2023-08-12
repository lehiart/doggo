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

    const opinions = await db.opinion.findMany({
      where: {
        companyId,
      },
    })

    if (!opinions) {
      return new NextResponse('Not found', { status: 404 })
    }

    return NextResponse.json({ opinions })
  } catch (error) {
    console.error(error, 'GET_COMPANY_OPINIONS_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
