'use client'
import React from 'react'

import { useDashboardContext } from '@/components/dashboard/dashboard-context'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useCompanyClientRequests } from '@/lib/swr'
import { DataTable } from '../../../components/dashboard/clients/data-table'
import { columns } from '../../../components/dashboard/clients/columns'
import { Request } from '@prisma/client'

export default function CompanyClientRequestsPage() {
  const { selectedCompany } = useDashboardContext()

  const { clientRequests, isError, isLoading } = useCompanyClientRequests(
    selectedCompany?.id,
  )

  if (isLoading) return <div>Loading...</div>
  if (!selectedCompany || !clientRequests) return null

  return (
    <div className="h-screen space-y-4">
      <h1>clientes</h1>
      <div>Esta es la página de solciitudes de la empresa:</div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              tienes {clientRequests.length} solicitudes en total
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              tienes{' '}
              {
                clientRequests.filter(
                  (item: Request) => item.status === 'PENDING',
                ).length
              }{' '}
              solicitudes pendientes
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <DataTable columns={columns} data={clientRequests} />
    </div>
  )
}
