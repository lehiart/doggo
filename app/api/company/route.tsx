import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, categories, ...values } = body

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || id !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    await db.company.create({
      data: {
        ...values,
        owner: {
          connect: {
            id,
          },
        },
        categories: {
          connect: categories.map((id: string) => ({ id })),
        },
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'NEW_COMPANY_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData()

    const { companyId, userId, imageData, imageName, ...data } =
      Object.fromEntries(formData) as any

    if (!companyId) {
      return new Response(null, { status: 403 })
    }

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    const existingCompany = await db.company.findUnique({
      where: {
        id: companyId,
      },
      select: {
        imageURL: true,
      },
    })

    if (!existingCompany) {
      return new NextResponse(null, { status: 500 })
    }

    if (JSON.parse(data.categories).length > 0) {
      data.categories = {
        connect: JSON.parse(data.categories).map((id: string) => ({ id })),
      }
    }

    // If it has an image, upload it to B2
    if (imageData) {
      const s3 = new S3Client({
        endpoint: 'https://' + process.env.B2_COMPANY_IMAGE_BUCKET_URL,
        region: process.env.B2_COMPANY_IMAGE_BUCKET_REGION,
      })

      const arrayBuffer = await imageData.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const filename = `${uuid()}-${imageName}`

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.B2_COMPANY_IMAGE_BUCKET_NAME,
          Key: filename,
          Body: buffer,
        }),
      )

      data.imageURL = `https://${process.env.B2_COMPANY_IMAGE_BUCKET_NAME}.${process.env.B2_COMPANY_IMAGE_BUCKET_URL}/${filename}`

      // Delete old image from S3 if it exists
      if (existingCompany?.imageURL) {
        const oldFilename = existingCompany.imageURL.split('/').pop()

        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.B2_PACK_IMAGES_BUCKET_NAME,
            Key: oldFilename,
          }),
        )
      }
    }

    await db.company.update({
      where: {
        id: companyId,
      },
      data,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'EDIT_COMPANY_INFO_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
