import { PrismaClient, User, Pack, PackMember } from "@prisma/client";
import { faker } from "@faker-js/faker";
import createUsers from "./factories/user.factory";
import createPacksAndAssociateToUser from "./factories/pack.factory";
import createPackMembers from "./factories/pack-member.factory";

const prisma = new PrismaClient();

async function seed() {
  try {
    const deletePackMembers = prisma.packMember.deleteMany();
    const deletePacks = prisma.pack.deleteMany();
    const deleteUsers = prisma.user.deleteMany();

    // The transaction runs synchronously so deleteUsers must run last.
    await prisma.$transaction([deletePackMembers, deletePacks, deleteUsers]);

    const usersIds = await createUsers();
    const packsIds = await createPacksAndAssociateToUser(usersIds);
    await createPackMembers(packsIds);

    console.log("🌱 Database seeded 🌱");
  } catch {
    console.log("Error seeding database");
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
