import { faker } from "@faker-js/faker";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

type RequiredUser = Omit<User, "id">;

const createMultipleUsers = (amount: number) => {
  const users: RequiredUser[] = [];

  for (let i = 0; i < amount; i++) {
    const user: RequiredUser = {
      name: faker.internet.userName(),
      hashedPassword: faker.internet.password(),
      email: faker.internet.email().toLowerCase(),
      emailVerified: null,
      image: faker.image.avatar(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      phone: faker.phone.number("55########"),
      links: JSON.stringify([
        {
          id: faker.string.uuid(),
          value: faker.helpers.arrayElement([
            "website",
            "twitter",
            "instagram",
            "facebook",
            "linkedin",
          ]),
          url: faker.internet.url(),
        },
      ]),
      bio: faker.lorem.sentences(2),
      location: faker.helpers.arrayElement(["CDMX", "BC", "GTO", "BCS", "AGS"]),
    };

    users.push(user);
  }

  return users;
};

const createUsers = async (): Promise<string[]> => {
  const mulitpleUsers = createMultipleUsers(5);

  const usersIds = (
    await Promise.all(
      mulitpleUsers.map((currentUserData) => {
        return prisma.user.create({ data: currentUserData });
      })
    )
  ).map((el) => el.id);

  return usersIds;
};

export default createUsers;
