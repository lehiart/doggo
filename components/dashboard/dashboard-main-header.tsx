'use client'

import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function DashboardMainHeader() {
  const pathname = usePathname()

  return (
    <nav className="flex w-full items-center justify-between ml-6">
      <div className="space-x-4">
        <Link
          href="/dashboard"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary text-muted-foreground',
            pathname === '/dashboard' && 'text-primary',
          )}
        >
          Resumen
        </Link>
        <Link
          href="/dashboard/items"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary text-muted-foreground',
            pathname === '/dashboard/items' && 'text-primary',
          )}
        >
          Servicios y productos
        </Link>
        <Link
          href="/dashboard/clientes"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary text-muted-foreground',
            pathname === '/dashboard/clientes' && 'text-primary',
          )}
        >
          Clientes
        </Link>
        <Link
          href="/dashboard/opiniones"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary text-muted-foreground',
            pathname === '/dashboard/opiniones' && 'text-primary',
          )}
        >
          Opiniones
        </Link>
        <Link
          href="/dashboard/pagos"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary text-muted-foreground',
            pathname === '/dashboard/pagos' && 'text-primary',
          )}
        >
          Facturacion
        </Link>
        <Link
          href="/dashboard/ajustes"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary text-muted-foreground',
            pathname === '/dashboard/ajustes' && 'text-primary',
          )}
        >
          Ajustes
        </Link>
      </div>

      <Link href="/dashboard/nuevo">
        <Button>Agregar nuevo negocio</Button>
      </Link>
    </nav>
  )
}
