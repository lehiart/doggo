import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({}); // use with caution.

  const amountOfUsers = 5;

  const users: User[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const user: User = {
      id: faker.string.uuid(),
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
          value: "website",
          url: faker.internet.url(),
        },
      ]),
      bio: faker.lorem.sentences(2),
      location: faker.helpers.arrayElement(["CDMX", "BC", "GTO", "BCS", "AGS"]),
    };

    users.push(user);
  }

  // Insert users into the database
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
