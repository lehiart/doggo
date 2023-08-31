import React from 'react'
import {
  ChevronDownIcon,
  HeartIcon,
  HomeIcon,
  InboxIcon,
  MessageCircleIcon,
  SettingsIcon,
  User2Icon,
} from 'lucide-react'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export default function MobileNav() {
  return (
    <Menubar className="md:hidden">
      <MenubarMenu>
        <MenubarTrigger className="flex gap-2 w-1/2 justify-center">
          Secciones
          <ChevronDownIcon />
        </MenubarTrigger>

        <MenubarContent>
          <MenubarItem asChild>
            <Link href="/manada">
              <HomeIcon className="w-4 h-4 mr-2" />
              Mi manada
            </Link>
          </MenubarItem>

          <MenubarSeparator />

          <MenubarItem asChild>
            <Link href="/manada/solicitudes">
              <InboxIcon className="w-4 h-4 mr-2" />
              Solicitudes
            </Link>
          </MenubarItem>

          <MenubarSeparator />

          <MenubarItem asChild>
            <Link href="/manada/favoritos">
              <HeartIcon className="w-4 h-4 mr-2" />
              Servicios favoritos
            </Link>
          </MenubarItem>

          <MenubarSeparator />

          <MenubarItem asChild>
            <Link href="/manada/opiniones">
              <MessageCircleIcon className="w-4 h-4 mr-2" />
              Mis opiniones
            </Link>
          </MenubarItem>
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
          <MenubarItem asChild>
            <Link href="/perfil">
              <User2Icon className="w-4 h-4 mr-2" /> Editar perfil
            </Link>
          </MenubarItem>

          <MenubarSeparator />

          <MenubarItem asChild>
            <Link href="/perfil/cuenta">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Editar cuenta
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
