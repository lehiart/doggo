import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CompanyForm from '@/components/company-form/company-form'
import { Company } from '@prisma/client'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'

async function getCompanyData(companyId: Company['id']) {
  return await db.company.findUnique({
    where: {
      id: companyId,
    },
    include: {
      categories: {
        select: {
          id: true,
        },
      },
    },
  })
}

interface CompanyEditorPageProps {
  params: { companyId: string }
}

export default async function EditCompanyPage({
  params,
}: CompanyEditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const company: any = await getCompanyData(params.companyId)

  if (!company) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen space-y-8 pb-16 mt-4 w-full">
      <Link href="/dashboard/ajustes">
        <Button variant="outline">
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          <span>Regresar</span>
        </Button>
      </Link>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Editar negocio</h2>
        <p className="text-muted-foreground">
          Actualizar detalles de la empresa, dirección y datos de contacto
        </p>
      </div>

      <Separator className="my-6" />

      <CompanyForm id={user?.id} type="EDIT" company={company} />
    </div>
  )
}
