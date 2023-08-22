import { db } from '@/lib/prisma'
import { Company, Item } from '@prisma/client'
import React from 'react'

async function getCategoryItems(categorySlug: string) {
  const items = await db.item.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
    },
  })

  return items
}

async function getCategoryCompanies(categorySlug: string) {
  const companies = await db.company.findMany({
    where: {
      categories: {
        some: {
          slug: categorySlug,
        },
      },
    },
  })

  return companies
}

interface ExploreByCategoryPageProps {
  params: { categorySlug: string }
}

async function ExploreByCategoryPage({ params }: ExploreByCategoryPageProps) {
  const items = await getCategoryItems(params.categorySlug)
  const companies = await getCategoryCompanies(params.categorySlug)

  console.log(companies)

  return (
    <div>
      <h1>Explorar por categoria</h1>
      <p>Categoria seleccionada: {params.categorySlug}</p>

      <div className="space-y-6 p-6">
        <h2 className="text-2xl">Resultados items</h2>
        {items.map((item: Item) => (
          <div key={item.id} className="p-4 border border-gray-300">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6 p-6">
        <h2 className="text-2xl">Resultados empresas</h2>
        {companies.map((company: Company) => (
          <div key={company.id} className="p-4 border border-gray-300">
            <h2>{company.name}</h2>
            <p>{company.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExploreByCategoryPage
