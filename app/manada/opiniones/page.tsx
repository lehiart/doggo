import { db } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'
import React from 'react'

async function GetUserOpinions() {
  const user = await getCurrentUser()

  if (!user) return

  const MyOpinions = await db.opinion.findMany({
    where: {
      userId: user.id,
    },
  })

  return MyOpinions
}

async function UserOpinionsPage() {
  const MyOpinions = await GetUserOpinions()

  return (
    <div>
      <div className="my-4 text-2xl">Mis opiniones</div>
      <pre>{JSON.stringify(MyOpinions, null, 2)}</pre>
    </div>
  )
}

export default UserOpinionsPage
