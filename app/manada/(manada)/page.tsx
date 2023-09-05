import React from 'react'
import { db } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import EmptyPack from '@/components/pack/empty-pack'
import { Separator } from '@/components/ui/separator'
import PackListGrid from '@/components/pack/pack-list-grid'

async function MyPackPage() {
  const user = await getCurrentUser()

  if (!user) return

  const myPack = await db.pack.findUnique({
    where: {
      userId: user?.id,
    },
    select: {
      members: true,
    },
  })

  return (
    <main className="lg:border-l h-full w-full">
      {!myPack?.members || myPack?.members.length === 0 ? (
        <EmptyPack />
      ) : (
        <section>
          <div className="flex flex-col justify-between w-full items-center space-y-4 mb-4">
            <p className="text-2xl font-bold text-center md:text-left mb-4 mt-4">
              Estos son los miembros de tu manada
            </p>

            {myPack.members.length < 10 ? (
              <Link href="manada/nuevo">
                <Button>Agregar nuevo</Button>
              </Link>
            ) : null}
          </div>

          <Separator className="my-8 lg:hidden" />

          <PackListGrid myPack={myPack.members} />
        </section>
      )}
    </main>
  )
}

export default MyPackPage
