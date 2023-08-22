import { PrismaClient } from '@prisma/client'
import createUsers from './factories/user.factory'
import createCategories from './factories/category.factory'
import createItemsAndAssociateToCompany from './factories/item.factory'
import createFavoriteItemsListToUser from './factories/favorite-items-list.factory'

const prisma = new PrismaClient()

async function seed() {
  try {
    const deleteVerificationTokens = prisma.verificationToken.deleteMany()
    const deleteFavoriteItemsList = prisma.favoriteItems.deleteMany()
    const deleteItems = prisma.item.deleteMany()
    const deleteCategories = prisma.category.deleteMany()
    const deletePackMembers = prisma.packMember.deleteMany()
    const deletePacks = prisma.pack.deleteMany()
    const deleteUsers = prisma.user.deleteMany()
    const deleteCompanies = prisma.company.deleteMany()

    // The transaction runs synchronously so deleteUsers must run last.
    await prisma.$transaction([
      deleteFavoriteItemsList,
      deleteItems,
      deleteCategories,
      deletePackMembers,
      deleteVerificationTokens,
      deletePacks,
      deleteUsers,
      deleteCompanies,
    ])

    // 1 - create categories
    await createCategories()

    // 2 - create users, role: user and company, create pack with members for role:user and companies for role:company
    const { usersId, companiesId } = await createUsers()

    // 3 - create items and associate them to the existing companies
    const itemsId = await createItemsAndAssociateToCompany(companiesId)

    // 4 - add items to favorite items list to role:user
    await createFavoriteItemsListToUser(usersId, itemsId)

    console.log('🌱 -  Database seeded - 🌱')
  } catch (err) {
    console.log('Error seeding database', err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
