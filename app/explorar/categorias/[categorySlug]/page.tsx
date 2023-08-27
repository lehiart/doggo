import React from 'react'
import { db } from '@/lib/prisma'
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
import { MapPinIcon, WifiIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getStateByKey, slugify } from '@/lib/utils'
import { CATEGORIES_NAME } from '@/lib/categories'

async function getCategoryItems(categorySlug: string) {
  const items = await db.item.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
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

function isCategoryNameValid(categoryName: string): boolean {
  return CATEGORIES_NAME.some(
    (category) => slugify(category.name) === categoryName,
  )
}

async function ExploreByCategoryPage({ params }: ExploreByCategoryPageProps) {
  const categoryExist = isCategoryNameValid(slugify(params.categorySlug))

  if (!categoryExist) {
    return (
      <section className="h-screen">
        <div className="flex justify-center items-center h-full max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className=" max-w-lg text-center pb-16">
            <h2 className="lg:text-6xl font-bold text-4xl mb-12 animate-slide-down">
              Categoria no encontrada
            </h2>
            <p className="mb-8">
              Por favor, intenta con otra categoria de la lista
            </p>
            <Link href="/explorar/categorias">
              <Button>Ir a la lista de categorias</Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const items = await getCategoryItems(params.categorySlug)
  const companies = await getCategoryCompanies(params.categorySlug)

  return (
    <section className="px-2">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="lg:text-6xl font-bold text-4xl mb-12 animate-slide-down capitalize">
            {params.categorySlug}
          </h2>
          <Link href="/explorar/categorias">
            <Button>Ir a la lista de categorias</Button>
          </Link>
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
                No hemos encontrado servicios disponibles en esta categoria
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
                        {getStateByKey(item.state)?.label}
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
              <span>No hemos encontrado negocios con esta categoria</span>
            ) : (
              <span> Selecciona para ver mas detalles.</span>
            )}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Link key={company.id} href={`/empresa/${company.slug}`}>
                <Card className="hover:shadow-md h-full flex flex-col justify-between">
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
                  <CardFooter>
                    {company.state && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPinIcon className="h-4 w-4" />
                        {getStateByKey(company.state)?.label}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExploreByCategoryPage
