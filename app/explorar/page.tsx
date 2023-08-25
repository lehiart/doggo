import React from 'react'
import { db } from '@/lib/prisma'
import { statesOfMexico } from '@/lib/states-of-mexico'
import Link from 'next/link'
import SearchCommand from '../../components/search-command'
import createCategories from '@/prisma/factories/category.factory'

async function getCategoriesData() {
  const categoriesCount = await db.category.count()

  if (categoriesCount === 0) {
    await createCategories()
  }

  const categories = await db.category.findMany({})

  return categories
}

async function ExplorePage() {
  const categories = await getCategoriesData()

  return (
    <div className="space-y-8 flex flex-col lg:justify-center items-center  h-full">
      <div>
        <h1 className="text-4xl bold">Buscador pro</h1>
        <p>Explora los servicios que otros usuarios han compartido</p>
      </div>

      <SearchCommand />

      <div>
        <h2 className="text-4xl bold">busqueda libre por categoria</h2>
        <p>Explora los servicios que otros usuarios han compartido</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 max-w-3xl">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/explorar/categorias/${category.slug}`}
            >
              <div className="flex items-center justify-center h-full p-4 border border-gray-300">
                <p className="flex-grow text-center">{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-4xl bold">busqueda libre por estado</h2>
        <p>Explora los servicios que otros usuarios han compartido</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {statesOfMexico.map((state) => (
            <Link key={state.value} href={`/explorar/lugares/${state.slug}`}>
              <div className="flex items-center justify-center h-full p-4 border border-gray-300">
                <p>{state.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
