import { ROLE } from "../../lib/constants";
import { faker } from "@faker-js/faker";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

type RequiredUser = Omit<User, "id" | "emailVerified">;

const createMultipleUsers = (amount: number, role: ROLE) => {
  const users: RequiredUser[] = [];

  for (let i = 0; i < amount; i++) {
    const user: any = {
      name: faker.internet.userName(),
      hashedPassword: faker.internet.password(),
      email: faker.internet.email().toLowerCase(),
      image: faker.image.avatar(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      role: role,
      profile: { create: {} }, //everyone has a profile
    };

    // only role:company has multiple company
    if (role !== ROLE.USER && role === ROLE.COMPANY) {
      user.role = role;
      user.companies = {
        create: {
          name: faker.company.name(),
          email: faker.internet.email().toLowerCase(),
          image: faker.image.avatar(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      };
    }

    // only role:user has one pack with multiple members
    // only role:user has favorite items list
    if (role === ROLE.USER) {
      user.pack = {
        create: {
          members: {
            create: {
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
            },
          },
        },
      };

      user.favoriteItems = {
        create: {},
      };
    }

    users.push(user);
  }

  return users;
};

const createUsers = async (): Promise<{
  usersId: string[];
  companiesId: string[];
}> => {
  const mulitpleUsers = createMultipleUsers(5, ROLE.USER);

  const usersId = (
    await Promise.all(
      mulitpleUsers.map((currentUserData) => {
        return prisma.user.create({ data: currentUserData });
      }),
    )
  ).map((el) => el.id);

  const mulitpleAdmins = createMultipleUsers(5, ROLE.COMPANY);

  // for this we want the company id, not the user id
  const companiesId = (
    await Promise.all(
      mulitpleAdmins.map((currentUserData) => {
        return prisma.user.create({
          data: currentUserData,
          include: { companies: true },
        });
      }),
    )
  ).map((el) => {
    return el.companies[0].id;
  });

  return {
    usersId,
    companiesId,
  };
};

export default createUsers;
