'use server'

import { db } from '@/lib/prisma'

export default async function getfullCompanyData(id: string) {
  'use server'

  const company = await db.company.findUnique({
    where: { id },
    include: {
      categories: true,
    },
  })

  return company
}
