import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, ...values } = body;
    console.log(userId, values, "PROFILE_UPDATE");

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user || userId !== session?.user.id) {
      return new Response(null, { status: 403 });
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: values.name,
        image: values.image,
        profile: {
          update: {
            bio: values.bio,
            location: values.location,
            links: values.links,
            phone: values.phone,
          },
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error, "PPROFILE_UPDATE_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
