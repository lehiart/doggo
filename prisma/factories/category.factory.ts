import { PrismaClient } from '@prisma/client'

import { slugify } from '../../lib/utils'
import { CATEGORIES_NAME } from '../../lib/categories'

const prisma = new PrismaClient()

const createCategories = async () => {
  CATEGORIES_NAME.map(async (element) => {
    await prisma.category.create({
      data: {
        name: element.name,
        slug: slugify(element.name),
      },
    })
  })
}

export default createCategories
