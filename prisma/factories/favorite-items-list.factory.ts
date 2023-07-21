import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add a items list to each user created with one random item
const createFavoriteItemsListToUser = async (
  usersIds: string[],
  itemsIds: string[]
) => {
  const itemsListIds = (
    await Promise.all(
      usersIds.map((userId) => {
        const data = {
          id: faker.string.uuid(),
          userId: userId,
          items: {
            connect: {
              id: faker.helpers.arrayElement(itemsIds), // add an existing item randomly
            },
          },
        };

        return prisma.favoriteItems.create({ data });
      })
    )
  ).map((el) => el.id);

  return itemsListIds;
};

export default createFavoriteItemsListToUser;
