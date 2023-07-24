import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return new NextResponse(null, { status: 403 });
    }

    const user = await db.user.findFirst({
      where: {
        verificationTokens: {
          some: {
            AND: [
              {
                activatedAt: null,
              },
              {
                createdAt: {
                  gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
                },
              },
              {
                token,
              },
            ],
          },
        },
      },
    });

    if (!user) {
      return new NextResponse("Token not valid", { status: 401 });
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
      },
    });

    await db.verificationToken.update({
      where: {
        token,
      },
      data: {
        activatedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error, "TOKEN_ACTIVATE_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
