'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const sidebarNavItems = [
  {
    title: 'Mi manada',
    href: '/manada',
  },
  {
    title: 'Solicitudes',
    href: '/manada/solicitudes',
  },
  {
    title: 'Servicios favoritos',
    href: '/manada/favoritos',
  },
  {
    title: 'Mis opiniones',
    href: '/manada/opiniones',
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="space-x-0 md:space-x-0 lg:flex-col lg:space-y-1 hidden md:flex flex-col">
      {sidebarNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href ||
              (item.href === '/manada' && pathname.includes('nuevo')) ||
              pathname.includes('editar')
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'flex justify-start',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
