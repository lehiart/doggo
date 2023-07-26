import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, image, name, breed, age, size, gender, weight } = body;

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user || id !== session?.user.id) {
      return new Response(null, { status: 403 });
    }

    const myPack = await db.pack.findUnique({
      where: {
        userId: id,
      },
      select: {
        id: true,
        members: true,
      },
    });

    if (!myPack) {
      return new NextResponse("Something went wrong", { status: 500 });
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
        imageURL: image,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error, "NEW_PACK_MEMBER_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, memberId, ...data } = body;

    if (!memberId) {
      return new Response(null, { status: 403 });
    }

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user || id !== session?.user.id) {
      return new Response(null, { status: 403 });
    }

    await db.packMember.update({
      where: {
        id: memberId,
      },
      data,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error, "EDIT_PACK_MEMBER_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
