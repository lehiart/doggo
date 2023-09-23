'use client'

import React from 'react'

import { useDashboardContext } from '@/components/dashboard/dashboard-context'
import { useCompanyClientRequests } from '@/lib/swr'
import { columns } from '../../../components/dashboard/clients/columns'
import ClientsEmptyScreens from '@/components/dashboard/clients/clients-empty-screen'
import SummaryCards from '@/components/dashboard/clients/summary-cards'
import DashboardClientsMobileList from '@/components/dashboard/clients/dashboard-clients-mobile-list'
import { DashboardClientsDataTable } from '@/components/dashboard/clients/dashboard-clients-data-table'

export default function CompanyClientRequestsPage() {
  const { selectedCompany } = useDashboardContext()

  const { clientRequests, isError, isLoading } = useCompanyClientRequests(
    selectedCompany?.id,
  )

  if (!selectedCompany || !clientRequests) return null

  return (
    <main className="h-full w-full">
      {!clientRequests || clientRequests?.length === 0 ? (
        <ClientsEmptyScreens url={selectedCompany.slug} />
      ) : (
        <section className="flex flex-col justify-between w-full items-center space-y-8 mb-4 mt-2">
          <h2 className="text-2xl font-bold text-center md:text-left my-4">
            Estas son las solicitudes que has recibido
          </h2>

          <SummaryCards requests={clientRequests} />

          {/* MOBILE LIST */}

          <DashboardClientsMobileList requests={clientRequests} />

          {/* DESKTOP TABLE */}

          <DashboardClientsDataTable
            columns={columns}
            data={clientRequests}
            className="hidden md:block"
          />
        </section>
      )}
    </main>
  )
}
