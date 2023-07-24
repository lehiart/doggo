import { PrismaClient } from "@prisma/client";
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
    const deleteVerificationTokens = prisma.verificationToken.deleteMany();
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
      deleteVerificationTokens,
      deleteUsers,
      deleteCompanies,
    ]);

    // 1 - create categories and subcategories
    await createCategories();

    // 2 - create users, create packs and associate them to the existing users, thencreate pack members
    const usersIds = await createUsers();
    const packsIds = await createPacksAndAssociateToUser(usersIds);
    await createPackMembers(packsIds);

    // 3 - create company users, create items and associate them to the existing companies
    const companiesIds = await createCompanies();
    const itemsIds = await createItemsAndAssociateToCompany(companiesIds);

    // 4 - create favorite items list to each user, with pre-existing items
    await createFavoriteItemsListToUser(usersIds, itemsIds);

    console.log("🌱 -  Database seeded - 🌱");
  } catch (err) {
    console.log("Error seeding database", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
