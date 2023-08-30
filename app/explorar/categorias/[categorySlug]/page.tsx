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
import { getStateFromKey, slugify } from '@/lib/utils'
import { CATEGORIES_NAME } from '@/lib/categories'

export async function generateMetadata({ params }: ExploreByCategoryPageProps) {
  return {
    title: 'Explorar',
    description: `Servicios de categoria: ${getCategoryNameFromSlug(
      params.categorySlug,
    )}`,
    openGraph: {
      siteName: 'Doghouse',
      // images: [
      //   {
      //     url: '/images/seo/open-graph.jpg',
      //     width: 800,
      //     height: 600,
      //   },
      //   {
      //     url: '/images/seo/og-category.jpg',
      //     width: 1800,
      //     height: 1600,
      //   },
      // ],
      locale: 'es_MX',
      type: 'website',
    },
  }
}

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

function getCategoryNameFromSlug(categorySlug: string): string {
  const category = CATEGORIES_NAME.find(
    (category) => slugify(category.name) === categorySlug,
  )

  return category?.name ?? categorySlug
}

async function ExploreByCategoryPage({ params }: ExploreByCategoryPageProps) {
  const categoryExist = isCategoryNameValid(slugify(params.categorySlug))

  if (!categoryExist) {
    return (
      <section className="h-screen">
        <div className="flex justify-center items-center h-full px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-center pb-16">
            <h2 className="lg:text-6xl font-bold text-4xl mb-12 animate-slide-down">
              Categoria no encontrada
            </h2>
            <p className="mb-8 text-xl">
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
        <div className="relative w-full h-80 bg-slate-500 rounded-md ">
          <Image
            src={`https://www-doggo.s3.us-east-005.backblazeb2.com/categories/${params.categorySlug}.jpg`}
            alt={`Imagen de la categoria ${params.categorySlug}`}
            fill
            objectFit="cover"
            priority
            className="brightness-75 dark:brightness-50 rounded-md"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full p-4">
            <h1 className=" text-primary-foreground text-4xl md:text-6xl font-bold  mb-12 animate-slide-down">
              {getCategoryNameFromSlug(params.categorySlug)}
            </h1>
            <Link href="/explorar/categorias">
              <Button variant="outline">Ir a la lista de categorias</Button>
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
                        {getStateFromKey(item.state)?.label}
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
                        {getStateFromKey(company.state)?.label}
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
