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
    <div className="block min-h-screen space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Editar negocio</h2>
        <p className="text-muted-foreground">Sobre mi negocio</p>

        <Link href={`/dashboard/ajustes`} className="mt-4">
          <Button>
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Atras
          </Button>
        </Link>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:max-w-2xl">
          <h1>Editar un negocio</h1>

          <CompanyForm id={user?.id} type="EDIT" company={company} />
        </div>
      </div>
    </div>
  )
}
