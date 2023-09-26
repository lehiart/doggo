import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import UpdateStateBtns from '@/components/dashboard/clients/update-state-btns'
import { Status } from '@prisma/client'
import { ChevronLeftIcon, PartyPopperIcon, PawPrintIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

async function getCompanyClientRequests(requestId: string) {
  return await db.request.findUnique({
    where: {
      id: requestId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          profile: {
            select: {
              phone: true,
            },
          },
        },
      },
    },
  })
}

interface ClientRequestDetailsPageProps {
  params: { requestId: string }
}

const parseDateFormat = (date: Date) => {
  const parsedDate = new Date(date)

  return parsedDate.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const parseStatus = (status: Status) => {
  switch (status) {
    case Status.PENDING:
      return 'Pendiente'
    case Status.ACCEPTED:
      return 'Aceptada'
    case Status.REJECTED:
      return 'Rechazada'
    default:
      return 'Pendiente'
  }
}

const parseSelectedItemsIntoList = (selectedItems: string) => {
  const parsedItems = JSON.parse(selectedItems)

  return parsedItems.map((item: { title: string }) => (
    <div
      key={item.title}
      className="-mx-2 flex items-center space-x-4 rounded-md p-2 "
    >
      <PawPrintIcon className="mt-px h-5 w-5" />
      <p className="text-sm font-medium leading-none">{item.title}</p>
    </div>
  ))
}

export default async function ClientRequestDetailsPage({
  params,
}: ClientRequestDetailsPageProps) {
  if (!params.requestId) {
    redirect('/dashboard/clientes')
  }

  const requestDetails = await getCompanyClientRequests(params.requestId)

  if (!requestDetails) {
    redirect('/dashboard/clientes')
  }

  return (
    <div className="h-screen">
      <Link href="/dashboard/clientes">
        <Button variant="outline">
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          <span>Regresar</span>
        </Button>
      </Link>

      {/* TITLe AND BADGE */}

      <div className="mb-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center md:text-left my-4 flex flex-col">
          Detalles de la solicitud
          <span>
            <Badge
              className="w-auto"
              variant={
                requestDetails.status === Status.REJECTED
                  ? 'destructive'
                  : 'default'
              }
            >
              {parseStatus(requestDetails.status)}
            </Badge>
          </span>
        </h2>
        <span className="text-muted-foreground">ID # {requestDetails.id} </span>
      </div>

      <Separator />

      {requestDetails.status === Status.PENDING && (
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              Felicidades <PartyPopperIcon />
            </CardTitle>
            <CardDescription>
              Tienes una nueva solicitud de cliente
            </CardDescription>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            <div>
              El usuario{' '}
              <span className="font-bold">
                {requestDetails.user.name?.split(' ')[0]}
              </span>{' '}
              ha solicitado tus servicios el{' '}
              {parseDateFormat(requestDetails.createdAt)}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle>Servicios</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-1">
          Esta interesado en los siguientes servicios:
          {requestDetails.selectedItems ? (
            parseSelectedItemsIntoList(requestDetails.selectedItems)
          ) : (
            <div className="-mx-2 flex items-center space-x-4 rounded-md p-2 ">
              <PawPrintIcon className="mt-px h-5 w-5" />
              <p className="text-sm font-medium leading-none">
                No selecciono ningun servicio en especifico
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle>Mensaje</CardTitle>
          <CardDescription>Te dejaron este mensaje</CardDescription>
        </CardHeader>

        <CardContent>{requestDetails.message}</CardContent>
      </Card>

      {requestDetails.status === Status.ACCEPTED && (
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle>Detalles del usuario</CardTitle>
          </CardHeader>

          <CardContent>
            {requestDetails.status === Status.ACCEPTED ? (
              <div className="space-y-2">
                <p>Nombre: {requestDetails.user.name}</p>
                <p>Email: {requestDetails.user.email}</p>
                <p>Telefono: {requestDetails.user.profile?.phone}</p>
              </div>
            ) : (
              <span>
                para ver los datos de este usuario, debes aceptar su solicitud.
              </span>
            )}
          </CardContent>
        </Card>
      )}

      {requestDetails.status === Status.REJECTED && (
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle>Razon por la que lo rechazaste</CardTitle>
            <CardDescription>
              {parseDateFormat(requestDetails.updatedAt)}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {requestDetails.reasonToReject || 'No especifico razon'}
          </CardContent>
        </Card>
      )}

      {/* STATUS ACTION BUTTONS */}

      <div className="mt-8">
        {requestDetails.status === Status.PENDING && (
          <UpdateStateBtns id={requestDetails.id} />
        )}
      </div>
    </div>
  )
}
