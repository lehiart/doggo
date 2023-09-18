import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, email, password, newPassword } = body

    if (!id || !email || !password || !newPassword) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || id !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    const userExistsByEmailAndId = await db.user.findUnique({
      where: {
        id,
        email,
      },
    })

    if (!userExistsByEmailAndId || !userExistsByEmailAndId.hashedPassword) {
      return new NextResponse('Cannot change your credentials', {
        status: 400,
      })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      userExistsByEmailAndId.hashedPassword,
    )

    if (!passwordMatches) {
      return new NextResponse('Cannot change your credentials', {
        status: 400,
      })
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12)

    await db.user.update({
      where: {
        id,
        email,
      },
      data: {
        hashedPassword: newHashedPassword,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'PASWORD_CHANGE_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { userId, password, email } = body

  if (!userId || !password) {
    return new NextResponse(null, { status: 400 })
  }

  // Ensure user is authenticated and has access to this user.
  const session = await getServerSession(authOptions)
  if (!session?.user || userId !== session?.user.id) {
    return new Response(null, { status: 403 })
  }

  try {
    //check password is correct
    const userExistsByEmailAndId = await db.user.findUnique({
      where: {
        id: userId,
        email,
      },
    })

    if (!userExistsByEmailAndId || !userExistsByEmailAndId.hashedPassword) {
      return new NextResponse(null, { status: 400 })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      userExistsByEmailAndId.hashedPassword,
    )

    if (!passwordMatches) {
      return new NextResponse(null, { status: 400 })
    }

    //proceed to delete user
    await db.user.delete({
      where: {
        id: userId,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err, 'DELETE_USER_ERROR')
    return new NextResponse(null, { status: 500 })
  }
}
