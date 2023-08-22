import { db } from '@/lib/prisma'
import { statesOfMexico } from '@/lib/states-of-mexico'
import React from 'react'

async function getStateItems(state: string) {
  const items = await db.item.findMany({
    where: {
      OR: [
        {
          state,
        },
        {
          onlineBusiness: true,
        },
      ],
    },
  })

  return items
}

async function getStateCompanies(state: string) {
  const companies = await db.company.findMany({
    where: {
      state,
    },
  })

  return companies
}

interface ExploreByStatePageProps {
  params: { stateSlug: string }
}

async function ExploreByStatePage({ params }: ExploreByStatePageProps) {
  const state = statesOfMexico.find((state) => state.slug === params.stateSlug)

  if (!state) {
    return <div>Estado no encontrado</div>
  }

  const items = await getStateItems(state?.value)
  const companies = await getStateCompanies(state?.value)

  // if (!items || items.length === 0) {
  //   return <div>no hay items para {state?.label}</div>
  // }

  console.log(items)

  return (
    <div>
      <h1 className="mb-4 text-3xl">Explorar por estado</h1>
      <div>Estado seleccionado: {params.stateSlug}</div>

      <div className="space-y-6 p-6">
        <h2 className="text-2xl">Resultados items</h2>
        {items.map((item) => (
          <div key={item.id} className="p-4 border border-gray-300">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6 p-6">
        <h2 className="text-2xl">Resultados negocios</h2>
        {companies.map((company) => (
          <div key={company.id} className="p-4 border border-gray-300">
            <h2>{company.name}</h2>
            <p>{company.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExploreByStatePage
