import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EmptyFavorites() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full mt-28">
      <h2 className="lg:text-4xl font-bold text-2xl mb-12 animate-slide-down text-center">
        Aún no tienes servicios favoritos
      </h2>
      <h3 className="text-center mb-2 text-xl w-[300px]">
        Te invitamos a explorar todos los servicios
      </h3>
      <h4 className="text-center mb-12 text-xl w-[300px]">
        ¡Hay mucho por descubrir!
      </h4>
      <Link href="/explorar">
        <Button>Ir a explorar</Button>
      </Link>
    </section>
  )
}
