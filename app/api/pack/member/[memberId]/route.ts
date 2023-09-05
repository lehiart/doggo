import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { memberId: string } },
) {
  try {
    const { memberId } = params

    await db.packMember.delete({
      where: {
        id: memberId,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'DELETE_PACK_MEMBER_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
