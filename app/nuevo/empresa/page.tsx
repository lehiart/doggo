import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CompanyForm from '@/components/company-form/company-form'
import { redirect } from 'next/navigation'
import { ROLE } from '@/lib/constants'
import { db } from '@/lib/prisma'

export default async function AddNewCompanyPage() {
  const user = await getCurrentUser()

  if (!user || !user?.id || user?.role !== ROLE.COMPANY) {
    redirect('/login')
  }

  // COUNT HOW MANY COMPANIES THE USER HAS
  const count = await db.company.count({
    where: {
      ownerId: user.id,
    },
  })

  // for now user can ony have one company
  // if (count >= 1) {
  //   redirect('/dashboard')
  // }

  return (
    <section className="min-h-screen space-y-8 pb-16 mt-4 w-full">
      <Link href="/dashboard">
        <Button variant="outline">
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          <span>Regresar</span>
        </Button>
      </Link>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Crear nuevo negocio
        </h2>
        <p className="text-muted-foreground">
          Agrega detalles de la empresa, dirección y datos de contacto
        </p>
      </div>

      <Separator className="my-6" />

      <CompanyForm id={user.id} type="NEW" />
    </section>
  )
}
