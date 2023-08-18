'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Dog } from 'lucide-react'
import { ROLE } from '@/lib/constants'

export function MainNav({ role }: { role: string | undefined }) {
  const pathname = usePathname()

  return (
    <>
      <div className="mr-4 hidden md:flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Dog className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">DogHouse</span>
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          {role === ROLE.COMPANY && (
            <Link
              href="/dashboard"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname.startsWith('/dashboard')
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              Mi negocio
            </Link>
          )}

          {role === ROLE.USER && (
            <Link
              href="/manada"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname.startsWith('/manada')
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              Mi manada
            </Link>
          )}

          <Link
            href="/explorar"
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname?.startsWith('/explorar')
                ? 'text-foreground'
                : 'text-foreground/60',
            )}
          >
            Explorar
          </Link>

          <Link
            href="/blog"
            className={cn(
              'hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:flex items-center space-x-1',
            )}
          >
            Blog
          </Link>
        </nav>
      </div>
    </>
  )
}
