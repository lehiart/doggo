'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'space-x-0 md:space-x-0 lg:flex-col lg:space-y-1 hidden md:flex flex-col',
        className,
      )}
      {...props}
    >
      {items.map((item) => (
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
