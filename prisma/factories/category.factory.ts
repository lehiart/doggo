import { faker } from "@faker-js/faker";
import { PrismaClient, Category, Subcategory } from "@prisma/client";

import { CATEGORY_NAMES } from "../../config/category";
import { slugify } from "../../lib/utils";

const prisma = new PrismaClient();

const createCategories = async () => {
  CATEGORY_NAMES.map(async (element) => {
    // create category
    const categoryResult = await prisma.category.create({
      data: {
        id: faker.string.uuid(),
        name: element.category,
        route: slugify(element.category),
      },
    });

    // then insert subcategories to that category
    element.subcategories.map(async (subcategory) => {
      await prisma.subcategory.create({
        data: {
          id: faker.string.uuid(),
          name: subcategory,
          route: slugify(subcategory),
          categoryId: categoryResult.id,
        },
      });
    });
  });
};

export default createCategories;
