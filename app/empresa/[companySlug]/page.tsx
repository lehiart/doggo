import { Company } from '@prisma/client'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { TerminalIcon } from 'lucide-react'
import { getCurrentUser } from '@/lib/session'

import ClientRequestForm from './client-request-form'
import ItemsSection from './items-section'

async function getCompanyData(companySlug: Company['slug']) {
  return await db.company.findUnique({
    where: {
      slug: companySlug,
    },
    include: {
      items: {
        where: {
          published: true,
        },
      },
      opinions: true,
    },
  })
}

interface CompanyPublicPageProps {
  params: { companySlug: string }
  searchParams: { preview?: string }
}

export default async function CompanyPublicPage({
  params,
  searchParams,
}: CompanyPublicPageProps) {
  if (!params.companySlug) {
    redirect('/')
  }

  const company = await getCompanyData(params.companySlug)

  if (!company) {
    redirect('/')
  }

  const user = await getCurrentUser()
  let favoritesList: any = []

  if (user) {
    favoritesList = await db.favoriteItems.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        items: {
          select: {
            id: true,
          },
        },
      },
    })
  }

  return (
    <div className="h-screen ">
      {searchParams.preview && (
        <div className="sticky top-[3.5rem]">
          <Alert>
            <TerminalIcon className="h-4 w-4" />
            <AlertTitle>Preview mode</AlertTitle>
            <AlertDescription>This page is in preview mode.</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="flex flex-col items-center mt-4 space-y-4">
        <h1 className="text-2xl">{company.name}</h1>
        <Alert className="w-[300px]">
          <TerminalIcon className="h-4 w-4" />
          <AlertTitle>formulario solo para registrados</AlertTitle>
          <AlertDescription>This page is in preview mode.</AlertDescription>
        </Alert>
        {/* ONLY VISIBLE TO USERS WITH ROLE:USER */}
        {user?.id && (
          <ClientRequestForm
            userId={user?.id}
            companyId={company?.id}
            email={company?.email}
            phone={company?.phone}
            items={company?.items}
          />
        )}
        <code className="max-w-2xl">{JSON.stringify(company, null, 2)}</code>
        Items:
        <ItemsSection
          items={company.items}
          userId={user?.id}
          role={user?.role}
          favoritesList={favoritesList.items}
        />
      </div>
    </div>
  )
}
