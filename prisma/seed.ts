import { PrismaClient, User, Pack, PackMember } from "@prisma/client";
import { faker } from "@faker-js/faker";
import createUsers from "./factories/user.factory";
import createPacksAndAssociateToUser from "./factories/pack.factory";
import createPackMembers from "./factories/pack-member.factory";
import createCategories from "./factories/category.factory";
import createCompanies from "./factories/company.factory";
import createItemsAndAssociateToCompany from "./factories/item.factory";
import createFavoriteItemsListToUser from "./factories/favorite-items-list.factory";

const prisma = new PrismaClient();

async function seed() {
  try {
    const deleteFavoriteItemsList = prisma.favoriteItems.deleteMany();
    const deleteItems = prisma.item.deleteMany();
    const deleteCategories = prisma.category.deleteMany();
    const deleteSubcategories = prisma.subcategory.deleteMany();
    const deletePackMembers = prisma.packMember.deleteMany();
    const deletePacks = prisma.pack.deleteMany();
    const deleteUsers = prisma.user.deleteMany();
    const deleteCompanies = prisma.company.deleteMany();

    // The transaction runs synchronously so deleteUsers must run last.
    await prisma.$transaction([
      deleteFavoriteItemsList,
      deleteItems,
      deleteSubcategories,
      deleteCategories,
      deletePackMembers,
      deletePacks,
      deleteUsers,
      deleteCompanies,
    ]);

    await createCategories();

    const usersIds = await createUsers();
    const packsIds = await createPacksAndAssociateToUser(usersIds);
    await createPackMembers(packsIds);

    const companiesIds = await createCompanies();
    const itemsIds = await createItemsAndAssociateToCompany(companiesIds);
    const lists = await createFavoriteItemsListToUser(usersIds, itemsIds);
    console.log(lists, "lists");

    console.log("🌱 Database seeded 🌱");
  } catch (err) {
    console.log("Error seeding database", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
