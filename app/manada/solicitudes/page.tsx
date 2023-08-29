import { db } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'
import React from 'react'

async function GetUserRequests() {
  const user = await getCurrentUser()

  if (!user) return

  const myRequests = await db.request.findMany({
    where: {
      userId: user.id,
    },
  })

  return myRequests
}

async function UserRequestsPage() {
  const myRequests = await GetUserRequests()
  return (
    <div>
      <div className="my-4 text-2xl">Mis solicitudes</div>
      <pre>{JSON.stringify(myRequests, null, 2)}</pre>
    </div>
  )
}

export default UserRequestsPage
