import React from 'react'
import { statesOfMexico } from '@/lib/states-of-mexico'
import Link from 'next/link'
import type { Metadata } from 'next'
import SearchCommand from '@/components/search-command'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Explorar - lugares',
  description:
    'Explora todos los servicios para tu perro disponibles en tu estado.',
}

async function ExplorePlacesPage() {
  return (
    <section className="px-2">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="relative w-full h-80 bg-slate-500 rounded-md mb-8">
          <Image
            src="https://www-doggo.s3.us-east-005.backblazeb2.com/pages/states-hero.jpg"
            alt="Fotografía de un perro en la ventana de un auto"
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

        {/* STATES GRID */}

        <div className="pt-16 pb-2" id="estados">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Estados</h2>
          <p className="tracking-light text-xl">
            Explora los servicios disponibles en tu estado.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {statesOfMexico.map((state) => (
              <Link key={state.value} href={`/explorar/lugares/${state.slug}`}>
                <div className="flex h-full items-center justify-center rounded-xl border p-6  text-center shadow-lg transition hover:border-primary hover:shadow-primary/20">
                  <h2 className="text-md font-bold ">{state.label}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExplorePlacesPage
