import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...values } = body;

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
