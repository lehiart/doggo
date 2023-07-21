import { faker } from "@faker-js/faker";
import { PrismaClient, Company } from "@prisma/client";

const prisma = new PrismaClient();

type RequiredUserData = Omit<Company, "id">;

const createMultipleUsers = (amount: number) => {
  const users: RequiredUserData[] = [];

  for (let i = 0; i < amount; i++) {
    const user: RequiredUserData = {
      name: faker.company.name(),
      hashedPassword: faker.internet.password(),
      email: faker.internet.email().toLowerCase(),
      emailVerified: null,
      image: faker.image.avatar(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      pro: false,
    };

    users.push(user);
  }

  return users;
};

const createCompanies = async (): Promise<string[]> => {
  const mulitpleUsers = createMultipleUsers(5);

  const usersIds = (
    await Promise.all(
      mulitpleUsers.map((currentUserData) => {
        return prisma.company.create({ data: currentUserData });
      })
    )
  ).map((el) => el.id);

  return usersIds;
};

export default createCompanies;
