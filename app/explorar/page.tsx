import React from 'react'
import { db } from '@/lib/prisma'
import SearchCommand from '../../components/search-command'
import createCategories from '@/prisma/factories/category.factory'
import type { Metadata } from 'next'
import CategoriesGrid from '@/components/explorer/categories-grid'
import StatesGrid from '@/components/explorer/states-grid'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Explorar',
  description:
    'Explora todos los servicios para tu perro disponibles por categoria o en tu estado.',
  openGraph: {
    title: 'Explorar',
    description:
      'Explora todos los servicios para tu perro disponibles por categoria o en tu estado.',
    url: 'https://www.doghouse.com/explorar',
    type: 'website',
    // images: [
    //   {
    //     url: 'https://www.doghouse.com/images/seo/og-explore.jpg',
    //   },
    // ],
  },
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
        <div className="relative w-full h-80 bg-slate-500 rounded-md mb-16">
          <Image
            src="https://www-doggo.s3.us-east-005.backblazeb2.com/pages/explore-hero.jpg"
            alt="Fotografía de un perro en la montaña"
            fill
            objectFit="cover"
            priority
            className="brightness-75 dark:brightness-50 rounded-md"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
            <h1 className=" text-primary-foreground text-4xl md:text-6xl font-bold  mb-12 animate-slide-down">
              Explorar
            </h1>

            <SearchCommand />
          </div>
        </div>

        {/* CATEGORIES GRID */}

        <CategoriesGrid categories={categories} />

        <Separator className="mb-12" />

        {/* STATES GRID */}
        <StatesGrid />
      </div>
    </section>
  )
}

export default ExplorePage
