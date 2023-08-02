import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, categories, ...values } = body;
    console.log(id, values, "BODY");

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user || id !== session?.user.id) {
      return new Response(null, { status: 403 });
    }

    const created = await db.company.create({
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
    });

    console.log(created, "CREATED");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error, "NEW_COMPANY_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, companyId, categories, ...data } = body;

    if (!companyId) {
      return new Response(null, { status: 403 });
    }

    // Ensure user is authenticated and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user || id !== session?.user.id) {
      return new Response(null, { status: 403 });
    }

    if (categories.length > 0) {
      data.categories = {
        set: categories.map((id: string) => ({ id })),
      };
    }

    await db.company.update({
      where: {
        id: companyId,
      },
      data,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error, "EDIT_COMPANY_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
