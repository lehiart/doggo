import { db } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'
import React from 'react'

async function GetUserFavorites() {
  const user = await getCurrentUser()

  if (!user) return

  const myFavorites = await db.favoriteItems.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      items: true,
    },
  })

  return myFavorites
}

async function UserOpinionsPage() {
  const myFavorites = await GetUserFavorites()

  return (
    <div>
      <div className="my-4 text-2xl">Mis favoritos</div>
      <pre>{JSON.stringify(myFavorites, null, 2)}</pre>
    </div>
  )
}

export default UserOpinionsPage
