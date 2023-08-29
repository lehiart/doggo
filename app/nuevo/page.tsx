import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CompanyForm from '@/components/company-form/company-form'
import { redirect } from 'next/navigation'
import { ROLE } from '@/lib/constants'

export default async function AddNewCompanyPage() {
  const user = await getCurrentUser()

  if (!user || !user?.id || user?.role !== ROLE.COMPANY) {
    redirect('/login')
  }

  return (
    <div className="block min-h-screen space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Mi nuevo negocio</h2>
        <p className="text-muted-foreground">Sobre mi negocio</p>

        <Link href="/dashboard" className="mt-4">
          <Button>
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Atras
          </Button>
        </Link>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1">
          <h1>Agrega un nuevo negocio</h1>

          <CompanyForm id={user.id} type="NEW" />
        </div>
      </div>
    </div>
  )
}
