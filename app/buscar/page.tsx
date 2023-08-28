import SearchCommand from '@/components/search-command'
import { db } from '@/lib/prisma'
import {
  getCategoryNameFromSlug,
  getStateFromKey,
  getStateNameFromSlug,
  getStateValueFromSlug,
} from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { MapPinIcon, SearchIcon, WifiIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export async function generateMetadata({ searchParams }: SearchPageProps) {
  return {
    title: 'Busqueda',
    description: `Servicios de ${getCategoryNameFromSlug(
      searchParams.categoria,
    )} en el estado de ${getStateNameFromSlug(searchParams.lugar)}`,
  }
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

// http://localhost:3002/buscar/?categoria=alimentacion&lugar=zacatecas&lugar=mexico&online=true
async function SearchPage({ searchParams }: SearchPageProps) {
  const items = await getItemsFromSearchParams(searchParams)

  return (
    <section className="px-2 h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-lg text-center pb-16">
          <h2 className="lg:text-6xl font-bold text-4xl mb-12 ">Busqueda</h2>
          <Alert className="border-t border-b border-primary bg-primary/10">
            <SearchIcon className="h-4 w-4" />
            <AlertTitle className="mb-4">Buscamos servicios de:</AlertTitle>
            <AlertDescription>
              {getCategoryNameFromSlug(searchParams.categoria)}{' '}
              {searchParams?.lugar
                ? ' en el estado de ' + getStateNameFromSlug(searchParams.lugar)
                : ' sin especificar lugar'}
              {searchParams.online && ', incluyendo servicios en linea.'}
            </AlertDescription>
          </Alert>
        </div>

        {/* SEARCH RESULT GRID */}

        <div className="max-w-lg pb-2" id="categorias">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Encontramos {items.length}{' '}
            {items.length === 1 ? ' resultado' : ' resultados'}
          </h2>
          <p className="tracking-light text-xl mb-8">
            {items.length === 0
              ? 'Prueba haciendo una nueva busqueda.'
              : 'Selecciona para ver mas detalles.'}
          </p>
          {items.length === 0 && <SearchCommand />}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.id} href={`/empresa/${item.company.slug}`}>
              <Card className="hover:shadow-md h-full">
                <CardHeader>
                  <Image
                    src="https://source.unsplash.com/IPheOySCW7A"
                    alt={`Imagen de portada de ${item.title}`}
                    width={500}
                    height={500}
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="mb-4">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  {item.onlineBusiness && (
                    <div className="flex gap-2 text-sm items-center">
                      <WifiIcon className="h-4 w-4" />
                      Servicio disponible en línea
                    </div>
                  )}
                  {item.state && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPinIcon className="h-4 w-4" />
                      {getStateFromKey(item.state)?.label}
                    </div>
                  )}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SearchPage
