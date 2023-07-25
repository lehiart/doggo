import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, context: Record<string, any>) {
  try {
    const { memberId } = context.params;

    // Check if the user has access to this pack member.
    if (!(await verifyCurrentUserHasAccessToPackMember(memberId))) {
      return new Response(null, { status: 403 });
    }

    await db.packMember.delete({
      where: {
        id: memberId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error, "DELETE_PACK_MEMBER_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToPackMember(packMemberId: string) {
  const session = await getServerSession(authOptions);
  const count = await db.pack.count({
    where: {
      userId: session?.user.id,
      members: {
        some: {
          id: packMemberId,
        },
      },
    },
  });

  return count > 0;
}
