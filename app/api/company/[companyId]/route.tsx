import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { companyId: string } },
) {
  try {
    const { companyId } = params;

    // Check if the user has access to this pack member.
    if (!(await verifyCurrentUserHasAccessToCompany(companyId))) {
      return new Response(null, { status: 403 });
    }

    await db.company.delete({
      where: {
        id: companyId,
      },
    });

    console.log("companyId", companyId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error, "DELETE_COMPANY_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToCompany(companyId: string) {
  const session = await getServerSession(authOptions);
  const count = await db.user.count({
    where: {
      id: session?.user.id,
      companies: {
        some: {
          id: companyId,
        },
      },
    },
  });

  return count > 0;
}
