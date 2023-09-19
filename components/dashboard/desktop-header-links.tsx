'use client'

import React from 'react'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function DesktopHeaderLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden xl:flex w-full items-center justify-end xl:justify-between ml-4">
      <div className="space-x-4 ">
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
            pathname.startsWith('/dashboard/items') && 'text-primary',
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
          Pagos
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
    </nav>
  )
}
