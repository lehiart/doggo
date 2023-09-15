import React from 'react'
import { db } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'
import EmptyOpinions from '@/components/pack/my-opinions/empty-opinions'
import { DataTable } from '@/components/pack/my-opinions/data-table'
import { columns } from '@/components/pack/my-opinions/columns'
import MobileList from '@/components/pack/my-opinions/mobile-list'

export interface UserOpinionsQuery {
  id: string
  createdAt: Date
  itemName: string
  rating: number
  comment: string
  company: {
    name: string
    slug: string
  }
}

async function GetUserOpinions() {
  const user = await getCurrentUser()

  if (!user) return []

  const MyOpinions = await db.opinion.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      createdAt: true,
      itemName: true,
      rating: true,
      comment: true,
      company: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  })

  return MyOpinions
}

async function UserOpinionsPage() {
  const myOpinions = await GetUserOpinions()

  return (
    <main className="h-full w-full">
      {!myOpinions || myOpinions?.length === 0 ? (
        <EmptyOpinions />
      ) : (
        <section className="flex flex-col justify-between w-full items-center space-y-8 mb-4 mt-2">
          <h2 className="text-2xl font-bold text-center md:text-left mb-4">
            Estas son las opniones que has dado
          </h2>

          {/* MOBILE LIST */}

          <MobileList opinions={myOpinions} />

          {/* DESKTOP TABLE */}

          <DataTable
            columns={columns}
            data={myOpinions}
            className="hidden md:block"
          />
        </section>
      )}
    </main>
  )
}

export default UserOpinionsPage
