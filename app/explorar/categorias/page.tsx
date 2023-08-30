import React from 'react'
import { db } from '@/lib/prisma'
import Link from 'next/link'
import createCategories from '@/prisma/factories/category.factory'
import type { Metadata } from 'next'
import SearchCommand from '@/components/search-command'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Explorar - categorias',
  description:
    'Explora todos los servicios para tu perro disponibles por categoria.',
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

async function ExploreCategoriesPage() {
  const categories = await getCategoriesData()

  return (
    <section className="px-2">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="relative w-full h-80 bg-slate-500 rounded-md mb-8">
          <Image
            src="https://www-doggo.s3.us-east-005.backblazeb2.com/pages/category-hero.jpg"
            alt="Fotografía de un perro en una tienda de mascotas"
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

        {/* CATEOGIRES GRID */}

        <div className="max-w-lg pb-2" id="categorias">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Categorias</h2>
          <p className="tracking-light text-xl">
            Explora las principales categorias de servicios para tu perro.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/explorar/categorias/${category.slug}`}
            >
              <div className="flex h-full items-center justify-center rounded-xl border p-6 shadow-lg text-center transition hover:border-primary hover:shadow-primary/20">
                <h2 className="text-md font-bold ">{category.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreCategoriesPage
