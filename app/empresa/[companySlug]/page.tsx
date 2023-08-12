import { Company, Item } from '@prisma/client'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { TerminalIcon } from 'lucide-react'
import AddOpinionDialog from '@/components/dashboard/opinions/add-opinion-dialog'
import { getCurrentUser } from '@/lib/session'
// import { ROLE } from '@/lib/constants'

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
  const user = await getCurrentUser()

  if (!company) {
    redirect('/')
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
        <code className="max-w-2xl">{JSON.stringify(company, null, 2)}</code>
        Items:
        {company.items.map((item: Item) => (
          <div
            key={item.id}
            className="flex flex-col items-center space-y-4 border border-gray-200 p-4"
          >
            <span>{item.title}</span>
            {/* user?.role === ROLE.USER */}
            {user?.id && (
              <AddOpinionDialog
                itemId={item.id}
                name={item.title}
                companyId={item.companyId}
                userId={user.id}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
