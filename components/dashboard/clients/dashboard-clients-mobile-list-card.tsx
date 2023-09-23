import React from 'react'
import { Item } from '@prisma/client'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  CalendarIcon,
  ChevronDownIcon,
  EyeIcon,
  LayoutListIcon,
  MessageCircleIcon,
} from 'lucide-react'
import Link from 'next/link'
import { UserRequestQuery } from '@/app/manada/solicitudes/page'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'

interface MobileListCardProps {
  request: UserRequestQuery
  position: number
}

const STATUS: { [key: string]: string } = {
  PENDING: 'Pendiente',
  ACCEPTED: 'Aprobada',
  REJECTED: 'Rechazada',
}

const buildDate = (date: Date) => {
  const dateObject = new Date(date)

  return dateObject.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const buildItemsList = (items: string) => {
  const amount = JSON.parse(items)
  let formatted = 'Sin servicios seleccionados'

  if (amount?.length > 0) {
    formatted = amount.map((item: Item) => item.title).join(', ')
  }

  return formatted + '.'
}

export default function DashboardClientsMobileListCard({
  request,
  position,
}: MobileListCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-baseline">
          Solicitud {position + 1}
          <span className="text-sm text-muted-foreground">
            {STATUS[request.status] || ''}
          </span>
        </CardTitle>
        <CardDescription className="flex gap-2 items-center">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm text-muted-foreground">
            {buildDate(request.createdAt)}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        {/* MESSAGE */}

        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <MessageCircleIcon className="w-8 h-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium leading-none">Mensaje</p>
              <p className="text-sm text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs">
                {request.message}
              </p>
            </div>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 self-end">
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Mensaje:</h4>
                  <p className="text-sm text-muted-foreground break-all">
                    {request.message || 'Sin mensaje.'}
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* SELECTED ITEMS */}

        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <LayoutListIcon className="w-8 h-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium leading-none">Servicios</p>
              <p className="text-sm text-muted-foreground">
                {buildItemsList(request.selectedItems)}
              </p>
            </div>
          </div>
        </div>

        {/* SEE DETAILS PAGE */}

        <Link
          href={`/dashboard/clientes/${request.id}`}
          className={cn(buttonVariants({ variant: 'outline' }), 'p-0')}
        >
          <EyeIcon className="h-4 w-4 mr-2" />
          Ver detalles
        </Link>
      </CardContent>
    </Card>
  )
}
