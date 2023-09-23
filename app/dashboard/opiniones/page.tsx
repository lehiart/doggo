'use client'
import React from 'react'

import { useDashboardContext } from '@/components/dashboard/dashboard-context'
import { useCompanyOpinions } from '@/lib/swr'

import OpinionsSummaryCards from '@/components/dashboard/opinions/opinions-summary-cards'

import { DashboardOpinionsDataTable } from '@/components/dashboard/opinions/dashboard-opinions-data-table'
import { columns } from '@/components/dashboard/opinions/columns'
import { Separator } from '@/components/ui/separator'
import CopyToClipboardInput from '@/components/dashboard/opinions/copy-to-clipboard-input'
import DashboardOpinionsMobileList from '@/components/dashboard/opinions/dashboard-opinions-mobile-list'
import DashboardOpinionsLoadingPage from './loading'

const COMPANY_BASE_URL = 'https://doghouse.mx/empresa/'

export default function CompanyOpinionsPage() {
  const { selectedCompany } = useDashboardContext()
  const { opinions, isError, isLoading } = useCompanyOpinions(
    selectedCompany?.id,
  )

  if (isLoading) return <DashboardOpinionsLoadingPage />

  if (!selectedCompany || !opinions) return null

  return (
    <main className="h-full w-full">
      {!opinions || opinions?.length === 0 ? (
        <section className="flex flex-col items-center justify-center w-full h-full mt-28">
          <h2 className="lg:text-4xl font-bold text-2xl mb-12 animate-slide-down text-center">
            Aún no tienes opiniones
          </h2>
          <CopyToClipboardInput
            title="Comparte tu pagina con tus clientes para que puedan opinar"
            url={`${COMPANY_BASE_URL}${selectedCompany.slug}`}
          />
        </section>
      ) : (
        <section className="flex flex-col justify-between w-full items-center space-y-8 mb-4 mt-4">
          <h2 className="text-2xl font-bold text-center md:text-left">
            Estas son las opniones que has recibido
          </h2>

          <CopyToClipboardInput
            title="Comparte tu pagina para que puedas recibir mas
            opiniones"
            url={`${COMPANY_BASE_URL}${selectedCompany.slug}`}
          />

          <Separator />

          <OpinionsSummaryCards opinions={opinions} />

          {/* MOBILE LIST */}
          <DashboardOpinionsMobileList opinions={opinions} />

          {/* DESKTOP TABLE */}
          <DashboardOpinionsDataTable columns={columns} data={opinions} />
        </section>
      )}
    </main>
  )
}
