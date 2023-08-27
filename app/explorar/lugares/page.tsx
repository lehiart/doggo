import React from 'react'
import { statesOfMexico } from '@/lib/states-of-mexico'
import Link from 'next/link'
import type { Metadata } from 'next'
import SearchCommand from '@/components/search-command'

export const metadata: Metadata = {
  title: 'Explorar - lugares',
  description:
    'Explora todos los servicios para tu perro disponibles en tu estado.',
}

async function ExplorePlacesPage() {
  return (
    <section className="px-2">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-lg text-center pb-16">
          <h2 className="lg:text-6xl font-bold text-4xl mb-12 animate-slide-down">
            Explorar
          </h2>
          <SearchCommand />
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
