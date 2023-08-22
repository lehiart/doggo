import { db } from '@/lib/prisma'
import { statesOfMexico } from '@/lib/states-of-mexico'
import Link from 'next/link'
import React from 'react'

const getStateValueFromSlug = (slug: string) => {
  const state = statesOfMexico.find((state) => state.slug === slug)

  return state?.value
}

interface SearchPageProps {
  searchParams: { lugar: string; online: string; categoria: string }
}

async function getItemsFromSearchParams(
  searchParams: SearchPageProps['searchParams'],
) {
  const onlineBusiness = searchParams.online === 'true'
  const state = getStateValueFromSlug(searchParams.lugar)

  if (!state) return []

  if (onlineBusiness) {
    const items = await db.item.findMany({
      where: {
        OR: [{ state }, { onlineBusiness: true }],
        category: {
          slug: searchParams.categoria,
        },
        published: true,
      },
      include: {
        company: true,
      },
    })

    return items
  } else {
    const items = await db.item.findMany({
      where: {
        state,
        category: {
          slug: searchParams.categoria,
        },
        published: true,
      },
      include: {
        company: true,
      },
    })

    return items
  }
}

// http://localhost:3002/buscar/?categoria=perro&lugar=zacatecas&lugar=mexico&online=true
async function SearchPage({ searchParams }: SearchPageProps) {
  const items = await getItemsFromSearchParams(searchParams)

  return (
    <div>
      <h1 className="mb-4 text-3xl">busqueda</h1>
      <div>con los parametros: {JSON.stringify(searchParams)}</div>

      <div>
        <h2 className="text-2xl">resultados: {items.length}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col  justify-center h-full p-4 border border-gray-300"
            >
              <Link href={`/empresa/${item.company.slug}`}>
                <p>Titulo: {item.title}</p>
                <p>Description: {item.description}</p>
                <p>Lugar: {item.state}</p>
                <p>Online: {item.onlineBusiness ? 'en linea' : 'no '}</p>
                <p>Categoria: {searchParams.categoria}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
