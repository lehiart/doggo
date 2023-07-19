import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...values } = body;

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user || id !== session?.user.id) {
      return new Response(null, { status: 403 });
    }

    const user = await db.user.update({
      where: {
        id,
      },
      data: values,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error, "REGISTRATION_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
