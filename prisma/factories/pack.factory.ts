import { faker } from "@faker-js/faker";
import { PrismaClient, Pack } from "@prisma/client";

const prisma = new PrismaClient();

const createPacksAndAssociateToUser = async (
  usersIds: string[]
): Promise<string[]> => {
  const packsIds = (
    await Promise.all(
      usersIds.map((currentUserData) => {
        const data: Pack = {
          id: faker.string.uuid(),
          userId: currentUserData,
        };

        return prisma.pack.create({ data });
      })
    )
  ).map((el) => el.id);

  return packsIds;
};

export default createPacksAndAssociateToUser;
