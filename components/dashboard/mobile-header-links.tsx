'use client'

import React from 'react'
import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import Link from 'next/link'

const pageLinks = [
  { href: '/dashboard', label: 'Resumen' },
  { href: '/dashboard/items', label: 'Servicios' },
  { href: '/dashboard/clientes', label: 'Clientes' },
  { href: '/dashboard/opiniones', label: 'Opiniones' },
  { href: '/dashboard/pagos', label: 'Pagos' },
  { href: '/dashboard/ajustes', label: 'Ajustes' },
]

export default function MobileHeaderLinks() {
  const [currentPage, setCurrentPage] = React.useState('Resumen')

  return (
    <div className="flex space-x-4 xl:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            <MenuIcon className="h-4 w-4 text-muted-foreground mr-2" />
            Secciones / {currentPage}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-popper-anchor-width] py-2">
          <nav>
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <DropdownMenuCheckboxItem
                  onSelect={() => setCurrentPage(link.label)}
                  checked={currentPage === link.label}
                >
                  {link.label}
                </DropdownMenuCheckboxItem>
              </Link>
            ))}
          </nav>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
