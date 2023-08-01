import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const categories = await db.category.findMany({
      select: { id: true, name: true },
    });

    const categoriesAsObject = categories.map((category) => ({
      id: category.id,
      label: category.name,
    }));

    return NextResponse.json({ categories: categoriesAsObject });
  } catch (error) {
    console.error(error, "GET_CATEGORIES_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
