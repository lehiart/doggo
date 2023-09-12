import React from 'react'
import { Request, Status } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CheckCircleIcon,
  HourglassIcon,
  InboxIcon,
  XCircleIcon,
} from 'lucide-react'
import { UserRequestQuery } from '@/app/manada/solicitudes/page'

interface SummaryCardsProps {
  requests: UserRequestQuery[]
}

export default function SummaryCards({ requests }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-2 w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
          <InboxIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{requests.length}</div>
          <p className="text-xs text-muted-foreground">solicitudes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
          <CardTitle className="text-sm font-medium">Aceptadas</CardTitle>
          <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {
              requests.filter((request) => request.status === Status.ACCEPTED)
                .length
            }
          </div>
          <p className="text-xs text-muted-foreground">solicitudes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
          <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
          <HourglassIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {
              requests.filter((request) => request.status === Status.PENDING)
                .length
            }
          </div>
          <p className="text-xs text-muted-foreground">solicitudes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
          <CardTitle className="text-sm font-medium">Rechazadas</CardTitle>
          <XCircleIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {
              requests.filter((request) => request.status === Status.REJECTED)
                .length
            }
          </div>
          <p className="text-xs text-muted-foreground">solicitudes</p>
        </CardContent>
      </Card>
    </div>
  )
}
