import { PrismaClient } from "@prisma/client";

import { CATEGORY_NAMES } from "../../lib/category";
import { slugify } from "../../lib/utils";

const prisma = new PrismaClient();

const createCategories = async () => {
  CATEGORY_NAMES.map(async (element) => {
    // create category
    const categoryResult = await prisma.category.create({
      data: {
        name: element.category,
        route: slugify(element.category),
      },
    });

    // then insert subcategories to that category
    element.subcategories.map(async (subcategory) => {
      await prisma.subcategory.create({
        data: {
          name: subcategory,
          route: slugify(subcategory),
          categoryId: categoryResult.id,
        },
      });
    });
  });
};

export default createCategories;
