import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { v4 as uuid } from 'uuid'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const userId = formData.get('userId') as string
    const imageData = formData.get('imageData') as File
    const imageName = formData.get('imageName') as string
    const name = (formData.get('name') as string) || undefined
    const bio = (formData.get('bio') as string) || undefined
    const links = (formData.get('links') as string) || undefined
    const phone = (formData.get('phone') as string) || undefined
    const location = (formData.get('location') as string) || undefined

    if (!userId) {
      return new Response(null, { status: 400 })
    }

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    // If it contains an image, upload it to B2 and update the user's image.
    if (imageData) {
      const s3 = new S3Client({
        endpoint: 'https://' + process.env.B2_PROFILE_IMAGE_BUCKET_URL,
        region: process.env.B2_PROFILE_IMAGE_BUCKET_REGION,
      })

      const arrayBuffer = await imageData.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const filename = `${uuid()}-${imageName}`

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.B2_PROFILE_IMAGE_BUCKET_NAME,
          Key: filename,
          Body: buffer,
        }),
      )

      const url = `https://${process.env.B2_PROFILE_IMAGE_BUCKET_NAME}.${process.env.B2_PROFILE_IMAGE_BUCKET_URL}/${filename}`

      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          image: url,
        },
      })

      await db.profile.upsert({
        where: {
          userId: userId,
        },
        create: {
          bio: bio,
          location: location,
          links: links,
          phone: phone,
          user: {
            connect: {
              id: userId,
            },
          },
        },
        update: {
          bio: bio,
          location: location,
          links: links,
          phone: phone,
        },
      })

      // If the user already had an image, delete it.
      if (session?.user?.image) {
        const oldImage = session.user.image.split('/').pop()
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.B2_PROFILE_IMAGE_BUCKET_NAME,
            Key: oldImage,
          }),
        )
      }
    } else {
      // if it doesn't contain an image, update the user's profile.
      //user may not have a profile yet, so we need to upsert

      if (session?.user?.name !== name) {
        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            name: name,
          },
        })
      }

      await db.profile.upsert({
        where: {
          userId: userId,
        },
        create: {
          bio: bio,
          location: location,
          links: links,
          phone: phone,
          user: {
            connect: {
              id: userId,
            },
          },
        },
        update: {
          bio: bio,
          location: location,
          links: links,
          phone: phone,
        },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error, 'PROFILE_UPDATE_ERROR')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
