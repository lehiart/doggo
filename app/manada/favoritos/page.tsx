import React from 'react'
import EmptyFavorites from '@/components/pack/my-favorites/empty-favorites'
import MyFavoritesList from '@/components/pack/my-favorites/my-favorites-list'
import { db } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'

export type MyFavoritesQuery = {
  id: string
  title: string
  description: string
  onlineBusiness: boolean
  state: string
  company: {
    name: string
    slug: string
  }
}

interface MyFavoritesData {
  items: MyFavoritesQuery[]
}

async function getUserFavorites(): Promise<MyFavoritesData | null> {
  const user = await getCurrentUser()

  if (!user) return null

  const myFavorites = await db.favoriteItems.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      items: {
        select: {
          id: true,
          title: true,
          description: true,
          onlineBusiness: true,
          state: true,
          company: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  })

  return myFavorites
}

async function UserFavoritesPage() {
  const myFavorites = await getUserFavorites()

  return (
    <main className="h-full w-full">
      {!myFavorites?.items || myFavorites?.items.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <section className="flex flex-col justify-between w-full items-center space-y-8 mb-4 mt-2">
          <h2 className="text-2xl font-bold text-center md:text-left">
            Favoritos
          </h2>
          <h3 className=" text-xl">
            {`Tienes ${myFavorites.items.length} ${
              myFavorites.items.length > 1 ? 'servicios' : 'servicio'
            } en tus favoritos`}
          </h3>

          <MyFavoritesList items={myFavorites.items} />
        </section>
      )}
    </main>
  )
}

export default UserFavoritesPage
