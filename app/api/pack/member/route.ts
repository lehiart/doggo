import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuid } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const breed = formData.get('breed') as string
    const age = formData.get('age') as string
    const size = formData.get('size') as string
    const gender = formData.get('gender') as string
    const weight = (formData.get('weight') as string) || undefined
    const imageData = formData.get('imageData') as File
    const imageName = formData.get('imageName') as string
    const userId = formData.get('userId') as string

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions)

    if (!session?.user || userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    const myPack = await db.pack.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
        members: true,
      },
    })

    if (!myPack) {
      return new NextResponse('Something went wrong', { status: 500 })
    }

    let url = undefined

    if (imageData) {
      const s3 = new S3Client({
        endpoint: 'https://' + process.env.B2_BUCKET_URL,
        region: process.env.B2_BUCKET_REGION,
      })

      const arrayBuffer = await imageData.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const filename = `${uuid()}-${imageName}`

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.B2_BUCKET_NAME,
          Key: filename,
          Body: buffer,
        }),
      )

      url = `https://${process.env.B2_BUCKET_NAME}.${process.env.B2_BUCKET_URL}/${filename}`

      console.log('Success!', 'File uploaded to S3', url)
    }

    await db.packMember.create({
      data: {
        packId: myPack.id,
        name,
        breed,
        age,
        size,
        gender,
        weight,
        imageURL: url,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'NEW_PACK_MEMBER_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, memberId, ...data } = body

    if (!memberId) {
      return new Response(null, { status: 403 })
    }

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || id !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    await db.packMember.update({
      where: {
        id: memberId,
      },
      data,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'EDIT_PACK_MEMBER_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
