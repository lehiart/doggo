import React from 'react'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/prisma'
import { statesOfMexico } from '@/lib/states-of-mexico'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { WifiIcon } from 'lucide-react'
import { getStateNameFromSlug } from '@/lib/utils'

export async function generateMetadata({ params }: ExploreByStatePageProps) {
  return {
    title: 'Explorar',
    description: `Servicios en el estado de ${getStateNameFromSlug(
      params.stateSlug,
    )}`,
  }
}

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
    include: {
      company: {
        select: {
          slug: true,
        },
      },
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
    return (
      <section className="h-screen w-full">
        <div className="flex justify-center items-center h-full px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-center pb-16">
            <h2 className="lg:text-6xl font-bold text-4xl mb-12 animate-slide-down">
              Estado no encontrado
            </h2>
            <p className="mb-8 text-xl">Por favor, intenta con otro estado</p>
            <Link href="/explorar/lugares">
              <Button variant="outline">Ir a la lista de estados</Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const items = await getStateItems(state?.value)
  const companies = await getStateCompanies(state?.value)

  return (
    <section className="px-2">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="relative w-full h-80 bg-slate-500 rounded-md">
          <Image
            src={`https://www-doggo.s3.us-east-005.backblazeb2.com/states/${state.slug}.jpg`}
            alt={`Imagen del estado de ${state.label}`}
            fill
            objectFit="cover"
            priority
            className="brightness-75 dark:brightness-50 rounded-md"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
            <h1 className=" text-primary-foreground text-4xl md:text-6xl font-bold  mb-12 animate-slide-down">
              {state.label}
            </h1>
            <Link href="/explorar/lugares">
              <Button variant="outline">Ir a la lista de estados</Button>
            </Link>
          </div>
        </div>

        {/* ITEMS CARD GRID */}

        <div className="pt-16 pb-2" id="estados">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Hemos encontrado {items.length}
            {items.length === 1 ? ' servicio' : ' servicios'}
          </h2>
          <p className="tracking-light text-xl">
            {items.length === 0 ? (
              <span>
                No hemos encontrado servicios disponibles en tu estado
              </span>
            ) : (
              <span> Selecciona para ver mas detalles.</span>
            )}
          </p>

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
                    <CardTitle className="mb-4 break-words">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="break-words">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    {item.onlineBusiness && (
                      <div className="flex gap-2 text-sm items-center">
                        <WifiIcon className="h-4 w-4" />
                        Servicio disponible en línea
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* COMPANIES CARD GRID */}

        <div className="pt-16 pb-2" id="estados">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Hemos encontrado {companies.length}
            {companies.length === 1 ? ' negocio' : ' negocios'}
          </h2>
          <p className="tracking-light text-xl">
            {companies.length === 0 ? (
              <span>No hemos encontrado negocios en tu estado</span>
            ) : (
              <span> Selecciona para ver mas detalles.</span>
            )}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Link key={company.id} href={`/empresa/${company.slug}`}>
                <Card className="hover:shadow-md h-full">
                  <CardHeader>
                    <Image
                      src="https://source.unsplash.com/nxZDMUQhN4o"
                      alt={`Imagen de portada de ${company.name}`}
                      width={500}
                      height={500}
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-4">{company.name}</CardTitle>
                    <CardDescription>{company.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExploreByStatePage
