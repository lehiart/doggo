import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createItemsAndAssociateToCompany = async (companiesIds: string[]) => {
  const realCategoryIds = await prisma.category.findMany({
    select: {
      id: true,
      subcategories: true,
    },
  });

  const itemsIds = (
    await Promise.all(
      companiesIds.map((currentCompanyData) => {
        const { id, subcategories } =
          faker.helpers.arrayElement(realCategoryIds);

        const data = {
          id: faker.string.uuid(),
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          categoryId: id,
          companyId: currentCompanyData,
          favoriteItemsId: "a",
          subcategories: {
            connect: { id: faker.helpers.arrayElement(subcategories).id },
          },
        };

        return prisma.item.create({ data });
      })
    )
  ).map((el) => el.id);

  return itemsIds;
};

export default createItemsAndAssociateToCompany;
