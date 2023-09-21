import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EmptyInitialScreen() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <h2 className="lg:text-4xl font-bold text-2xl mb-12 animate-slide-down text-center">
        Aun no tienes negocios registrados
      </h2>

      <p className="text-muted-foreground text-center mb-12">
        Agrega tu primer negocio para comenzar a usar la plataforma
      </p>

      <Link href="/nuevo/empresa/">
        <Button>Agregar nuevo negocio</Button>
      </Link>
    </section>
  )
}
