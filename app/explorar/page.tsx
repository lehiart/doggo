import React from 'react'
import { db } from '@/lib/prisma'
import SearchCommand from '../../components/search-command'
import createCategories from '@/prisma/factories/category.factory'
import type { Metadata } from 'next'
import CategoriesGrid from '@/components/explorer/categories-grid'
import StatesGrid from '@/components/explorer/states-grid'

export const metadata: Metadata = {
  title: 'Explorar',
  description:
    'Explora todos los servicios para tu perro disponibles por categoria o en tu estado.',
}

async function getCategoriesData() {
  const categoriesCount = await db.category.count()

  if (categoriesCount === 0) {
    await createCategories()
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return categories
}

async function ExplorePage() {
  const categories = await getCategoriesData()

  return (
    <section className="px-2">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-lg text-center pb-16">
          <h2 className="lg:text-6xl font-bold text-4xl mb-12 animate-slide-down">
            Explorar
          </h2>
          <SearchCommand />
        </div>

        {/* CATEGORIES GRID */}

        <CategoriesGrid categories={categories} />

        {/* STATES GRID */}
        <StatesGrid />
      </div>
    </section>
  )
}

export default ExplorePage
