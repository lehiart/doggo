import { Metadata } from 'next'

import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/pack/sidebar-nav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronDownIcon } from 'lucide-react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'

export const metadata: Metadata = {
  title: 'Mi manada',
  description: 'Administra tu manada',
}

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
            Sobre mi mandada y los miembros que la conforman.
          </p>

          <div className="gap-4 w-fit hidden md:flex">
            <Link href="/perfil">
              <Button variant="outline">Editar perfil</Button>
            </Link>
            <Link href="/perfil/cuenta">
              <Button variant="outline">Editar cuenta</Button>
            </Link>
          </div>
        </div>
      </div>

      <Menubar className="md:hidden">
        <MenubarMenu>
          <MenubarTrigger className="flex gap-2 w-1/2 justify-center">
            Secciones <ChevronDownIcon />
          </MenubarTrigger>

          <MenubarContent>
            {sidebarNavItems.map((item) => (
              <>
                <MenubarItem key={item.href}>{item.title}</MenubarItem>
                <MenubarSeparator />
              </>
            ))}
          </MenubarContent>
        </MenubarMenu>

        <Separator
          orientation="vertical"
          className="h-[20px] bg-secondary dark:bg-primary-foreground"
        />

        <MenubarMenu>
          <MenubarTrigger className="w-1/2 flex gap-2 justify-center mx-auto">
            Editar <ChevronDownIcon />
          </MenubarTrigger>

          <MenubarContent>
            <MenubarItem>Editar perfil</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Editar cuenta</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 h-full">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>

        <Separator className="my-6 hidden md:block lg:hidden" />

        <div className="flex-1 h-full">{children}</div>
      </div>
    </section>
  )
}
