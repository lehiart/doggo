import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function EmptyPack() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-28">
      <h2 className="lg:text-4xl font-bold text-2xl mb-12 animate-slide-down text-center">
        Aún no tienes miembros en tu manada
      </h2>

      <Link href="manada/nuevo">
        <Button>Agregar nuevo</Button>
      </Link>
    </div>
  )
}

export default EmptyPack
