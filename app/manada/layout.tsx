import { Metadata } from 'next'

import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/pack/sidebar-nav'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import MobileNav from '@/components/pack/mobile-nav'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Mi manada',
  description: 'Administra tu manada',
}

interface MyPackLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: MyPackLayoutProps) {
  return (
    <section className="block min-h-screen space-y-6 p-10 pb-16 container">
      <div className="space-y-0.5 h-full">
        <h2 className="text-2xl font-bold tracking-tight">Mi manada</h2>
        <div className="flex justify-between h-full">
          <p className="text-muted-foreground w-2/3 md:w-1/2">
            Administra tu manada, solicitudes, servicios favoritos y opiniones.
          </p>

          <div className="gap-4 w-fit hidden md:flex">
            <Link
              className={cn(
                buttonVariants({
                  variant: 'outline',
                }),
              )}
              href="/perfil"
            >
              Editar perfil
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: 'outline',
                }),
              )}
              href="/perfil/cuenta"
            >
              Editar cuenta
            </Link>
          </div>
        </div>
      </div>

      <MobileNav />

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 h-full">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav />
        </aside>

        <Separator className="my-6 hidden md:block lg:hidden" />

        <div className="flex-1 h-full">{children}</div>
      </div>
    </section>
  )
}
