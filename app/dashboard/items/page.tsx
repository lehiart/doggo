'use client'

import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDashboardContext } from '@/components/dashboard/dashboard-context'
import Link from 'next/link'
import { useCompanyItems } from '@/lib/swr'
import { Item } from '@prisma/client'
import DeleteItemButton from '@/components/dashboard/items/delete-item-btn'
import PublishUnpublishBtn from '@/components/dashboard/items/publish-unpublish-btn'

function CompanyItemsPage() {
  const { selectedCompany } = useDashboardContext()
  const { items, isError, isLoading, removeItem, updateItemPublishStatus } =
    useCompanyItems(selectedCompany?.id)

  if (!selectedCompany || isLoading) return null

  if (items?.length === 0) {
    return (
      <section className="h-screen w-full">
        <div className="flex items-center justify-center h-full w-full">
          <Card>
            <CardHeader>
              <CardTitle>
                Aun no tienes elementos {selectedCompany?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Para agregar un elemento, haz click en el botón de abajo.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/items/nuevo">
                <Button>Agregar elemento</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="h-full w-full">
      <div className="flex items-center justify-center flex-col w-full space-y-4">
        <Link href="/dashboard/items/nuevo">
          <Button>Agregar elemento</Button>
        </Link>

        {items.map((item: Item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Link href={`/dashboard/items/editar/${item.id}`}>
                <Button>Editar</Button>
              </Link>
              <DeleteItemButton removeItem={removeItem} itemId={item.id} />
              <PublishUnpublishBtn
                isPublished={item.published}
                updateItemPublishStatus={updateItemPublishStatus}
                itemId={item.id}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default CompanyItemsPage
