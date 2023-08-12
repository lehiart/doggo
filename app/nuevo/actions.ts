'use server'

import { db } from '@/lib/prisma'

export default async function checkSlugIsUnique(slug: string) {
  'use server'

  // // check that slug is not used in companies table
  const res = await db.company.findUnique({ where: { slug } })
  return res ? false : true
}
