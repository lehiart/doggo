'use client'

import * as React from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Dog, FacebookIcon, Menu, TwitterIcon, YoutubeIcon } from 'lucide-react'
import { ROLE } from '@/lib/constants'
import { usePathname } from 'next/navigation'

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
  active?: boolean
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  active,
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
      className={cn(
        className,
        active ? 'text-foreground' : 'text-foreground/60',
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export function MobileNav({ role }: { role: string | undefined }) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

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

      <SheetContent
        side="left"
        className="pr-0 flex flex-col justify-between h-full"
      >
        <div className="flex items-center text-xl">
          <MobileLink
            href="/"
            className="flex items-center text-lg"
            onOpenChange={setOpen}
            active
          >
            <Dog className="mr-2 h-8 w-8" />
            <span className="font-bold">DogHouse</span>
          </MobileLink>
        </div>

        <div className="flex flex-col px-[24px] gap-[8px] align-center justify-center">
          <MobileLink
            href="/"
            onOpenChange={setOpen}
            active={pathname === '/'}
            className="px-[16px] py-[8px] flex flex-row items-center justify-center text-4xl text-center transition-colors bg-transparent hover:opacity-70"
          >
            Inicio
          </MobileLink>

          {role === ROLE.COMPANY && (
            <MobileLink
              href="/dashboard"
              onOpenChange={setOpen}
              active={pathname === '/dashboard'}
              className="px-[16px] py-[8px] flex flex-row items-center justify-center text-4xl text-center transition-colors bg-transparent hover:opacity-70"
            >
              Mi negocio
            </MobileLink>
          )}

          {role === ROLE.USER && (
            <MobileLink
              href="/manada"
              onOpenChange={setOpen}
              active={pathname === '/manada'}
              className="px-[16px] py-[8px] flex flex-row items-center justify-center text-4xl text-center transition-colors bg-transparent hover:opacity-70"
            >
              Mi manada
            </MobileLink>
          )}

          <MobileLink
            href="/explorar"
            onOpenChange={setOpen}
            active={pathname === '/explorar'}
            className="px-[16px] py-[8px] flex flex-row items-center justify-center text-4xl text-center transition-colors bg-transparent hover:opacity-70"
          >
            Explorar
          </MobileLink>

          <MobileLink
            href="/blog"
            onOpenChange={setOpen}
            active={pathname === '/blog'}
            className="px-[16px] py-[8px] flex flex-row items-center justify-center text-4xl text-center transition-colors bg-transparent hover:opacity-70"
          >
            Blog
          </MobileLink>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <FacebookIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <TwitterIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <YoutubeIcon className="h-4 w-4" />
          </Button>
        </div>
      </SheetContent>

      {/* <SheetContent side="left" className="pr-0 w-full">
        <MobileLink
          href="/"
          className="flex items-center text-xl"
          onOpenChange={setOpen}
          active
        >
          <Dog className="mr-2 h-10 w-10" />
          <span className="font-bold">DogHouse</span>
        </MobileLink>

        <div className="flex flex-col px-[24px] gap-[8px] align-center justify-center h-full relative top-[-40px]">
          <div>
            <MobileLink
              href="/"
              onOpenChange={setOpen}
              active={pathname === '/'}
              className="px-[16px] py-[8px] flex flex-row items-center justify-center text-4xl text-center transition-colors bg-transparent"
            >
              Inicio
            </MobileLink>

            {role === ROLE.COMPANY && (
              <MobileLink
                href="/dashboard"
                onOpenChange={setOpen}
                active={pathname === '/dashboard'}
                className="px-[16px] py-[8px] flex flex-row items-center justify-center text-4xl text-center transition-colors bg-transparent"
              >
                Mi negocio
              </MobileLink>
            )}

            {role === ROLE.USER && (
              <MobileLink
                href="/manada"
                onOpenChange={setOpen}
                active={pathname === '/manada'}
                className="px-[16px] py-[8px] flex flex-row items-center justify-center text-4xl text-center transition-colors bg-transparent"
              >
                Mi manada
              </MobileLink>
            )}

            <MobileLink
              href="/explorar"
              onOpenChange={setOpen}
              active={pathname === '/explorar'}
              className="px-[16px] py-[8px] flex flex-row items-center justify-center text-4xl text-center transition-colors bg-transparent"
            >
              Explorar
            </MobileLink>

            <MobileLink
              href="/blog"
              onOpenChange={setOpen}
              active={pathname === '/blog'}
              className="px-[16px] py-[8px] flex flex-row items-center justify-center text-4xl text-center transition-colors bg-transparent"
            >
              Blog
            </MobileLink>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <FacebookIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <TwitterIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <YoutubeIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent> */}
    </Sheet>
  )
}
