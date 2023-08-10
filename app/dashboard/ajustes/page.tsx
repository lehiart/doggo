'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import DeleteCard from '../../../components/dashboard/delete-card'
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
    <div className="block min-h-screen space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Ajustes</h2>
        <p className="text-muted-foreground">
          Administra la configuración de tu negocio {selectedCompany.name}
        </p>
        <Link href="/dashboard">
          <Button>
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            <span>Atras</span>
          </Button>
        </Link>
        <div className="flex gap-2 justify-end">
          <Button>
            <Link href={`/dashboard/ajustes/editar/${selectedCompany.id}`}>
              Editar
            </Link>
          </Button>
          <DeleteCard companyId={selectedCompany.id} />
        </div>
      </div>

      <Separator className="my-6" />

      <CompanySettingsContainer company={company} />
    </div>
  )
}
