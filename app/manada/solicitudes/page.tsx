import React from 'react'
import { db } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'
import EmptyRequests from '@/components/pack/my-requests/empty-requests'
import { DataTable } from '@/components/pack/my-requests/data-table'
import { columns } from '@/components/pack/my-requests/columns'
import SummaryCards from '@/components/pack/my-requests/summary-cards'
import MobileList from '@/components/pack/my-requests/mobile-list'
import { Company } from '@prisma/client'

export interface UserRequestQuery {
  id: string
  createdAt: Date
  status: string
  message: string
  selectedItems: string
  company: Company
}

async function GetUserRequests(): Promise<any[]> {
  const user = await getCurrentUser()

  if (!user) return []

  const myRequests = await db.request.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      createdAt: true,
      status: true,
      message: true,
      selectedItems: true,
      company: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  })

  return myRequests
}

async function UserRequestsPage() {
  const myRequests: UserRequestQuery[] = await GetUserRequests()

  return (
    <main className="h-full w-full">
      {!myRequests || myRequests?.length === 0 ? (
        <EmptyRequests />
      ) : (
        <section className="flex flex-col justify-between w-full items-center space-y-8 mb-4 mt-2">
          <h2 className="text-2xl font-bold text-center md:text-left mb-4">
            Estas son las solicitudes que has hecho
          </h2>

          <SummaryCards requests={myRequests} />

          {/* MOBILE LIST */}

          <MobileList requests={myRequests} />

          {/* DESKTOP TABLE */}

          <DataTable
            columns={columns}
            data={myRequests}
            className="hidden md:block"
          />
        </section>
      )}
    </main>
  )
}

export default UserRequestsPage
