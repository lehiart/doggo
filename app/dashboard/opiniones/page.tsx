'use client'
import React from 'react'

import { useDashboardContext } from '@/components/dashboard/dashboard-context'
import { useCompanyOpinions } from '@/lib/swr'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Opinion } from '@prisma/client'
export default function CompanyOpinionsPage() {
  const { selectedCompany } = useDashboardContext()
  const { opinions, isError, isLoading } = useCompanyOpinions(
    selectedCompany?.id,
  )

  if (isLoading) return <div>Loading...</div>
  if (!selectedCompany || !opinions) return null

  return (
    <div className="h-screen space-y-4">
      <h1>Opiniones</h1>
      <div>Esta es la página de opiniones de la empresa:</div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              tienes {opinions.length} opiniones{' '}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              tu promedio es{' '}
              {opinions.reduce((a: number, b: Opinion) => a + b.rating, 0) /
                opinions.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <code>{JSON.stringify(opinions, null, 2)}</code>
    </div>
  )
}
