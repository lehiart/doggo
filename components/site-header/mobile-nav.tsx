'use client'

import * as React from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Dog, Menu } from 'lucide-react'
import { ROLE } from '@/lib/constants'

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export function MobileNav({ role }: { role: string | undefined }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Dog className="mr-2 h-4 w-4" />
          <span className="font-bold">DogHouse</span>
        </MobileLink>

        <div className="flex flex-col space-y-3 my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          {role === ROLE.COMPANY && (
            <MobileLink href="/dashboard" onOpenChange={setOpen}>
              Mi negocio
            </MobileLink>
          )}

          {role === ROLE.USER && (
            <MobileLink href="/manada" onOpenChange={setOpen}>
              Mi manada
            </MobileLink>
          )}

          <MobileLink href="/explorar" onOpenChange={setOpen}>
            Explorar
          </MobileLink>

          <MobileLink href="/blog" onOpenChange={setOpen}>
            Blog
          </MobileLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}
