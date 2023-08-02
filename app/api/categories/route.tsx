import { db } from "@/lib/prisma";
import createCategories from "@/prisma/factories/category.factory";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // check if categories exist in the database
    // if not, create them, then return them
    const categoriesCount = await db.category.count();

    if (categoriesCount === 0) {
      await createCategories();
    }

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
