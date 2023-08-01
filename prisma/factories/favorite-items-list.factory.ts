import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add a items list to each user created with one random item
const createFavoriteItemsListToUser = async (
  usersId: string[],
  itemsId: string[],
) => {
  usersId.map((userId) => {
    const data = {
      userId: userId,
      items: {
        connect: {
          id: faker.helpers.arrayElement(itemsId), // add an existing item randomly
        },
      },
    };

    return prisma.favoriteItems.create({ data });
  });
};

export default createFavoriteItemsListToUser;
