'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'

import { useDashboardContext } from '../../../components/dashboard/dashboard-context'
import CompanySettingsContainer from '@/components/company-form/company-settings-container'
import { useCompany } from '@/lib/swr'

export default function CompanySettingsPage() {
  const { selectedCompany } = useDashboardContext()

  const { company, isError, isLoading } = useCompany(selectedCompany?.id)

  if (isLoading) return <div>Loading...</div>
  if (!selectedCompany || !company) return null

  return (
    <div className="block min-h-screen space-y-6 pb-16 pt-4">
      <Link href="/dashboard">
        <Button variant="outline">
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          <span>Regresar</span>
        </Button>
      </Link>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-left">Ajustes</h2>

        <p className="text-muted-foreground">
          Administra los datos de tu negocio
        </p>
      </div>

      <Separator className="my-6" />

      <CompanySettingsContainer company={company} />
    </div>
  )
}
