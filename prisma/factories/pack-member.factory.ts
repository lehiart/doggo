import { faker } from "@faker-js/faker";
import { PrismaClient, PackMember } from "@prisma/client";

const prisma = new PrismaClient();

const createPackMembers = async (packIds: string[]): Promise<string[]> => {
  const packMembersIds = (
    await Promise.all(
      packIds.map((currentUserData) => {
        const data: PackMember = {
          id: faker.string.uuid(),
          packId: currentUserData,
          name: faker.person.firstName(),
          breed: faker.helpers.arrayElement([
            "Pug",
            "Chihuahua",
            "Labrador",
            "Pitbull",
            "Bulldog",
          ]),
          age: faker.helpers.arrayElement(["1", "2", "3", "4", "5"]),
          imageURL: faker.image.urlLoremFlickr({ category: "animals" }),
          size: faker.helpers.arrayElement(["small", "medium", "large"]),
          gender: faker.helpers.arrayElement(["male", "female"]),
          weight: faker.helpers.arrayElement(["1", "2", "3", "4", "5"]),
        };

        return prisma.packMember.create({ data });
      })
    )
  ).map((el) => el.id);

  return packMembersIds;
};

export default createPackMembers;
