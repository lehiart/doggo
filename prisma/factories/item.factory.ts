import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createItemsAndAssociateToCompany = async (companiesId: string[]) => {
  const realCategoryIds = await prisma.category.findMany({
    select: {
      id: true,
    },
  })

  const itemsId = (
    await Promise.all(
      companiesId.map(async (currentCompanyId) => {
        const { id } = faker.helpers.arrayElement(realCategoryIds)

        return await prisma.item.create({
          data: {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            state: faker.helpers.arrayElement(['HID', 'JAL', 'MEX', 'ZAC']),
            category: {
              connect: {
                id,
              },
            },
            company: {
              connect: {
                id: currentCompanyId,
              },
            },
          },
        })
      }),
    )
  ).map((el) => el.id)

  //////////////////
  return itemsId
}

export default createItemsAndAssociateToCompany
