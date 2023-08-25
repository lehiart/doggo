import { Company, FavoriteItems, Item } from '@prisma/client'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { TerminalIcon } from 'lucide-react'
import AddOpinionDialog from '@/components/dashboard/opinions/add-opinion-dialog'
import { getCurrentUser } from '@/lib/session'

import ClientRequestForm from './client-request-form'
import AddToFavoriteIcon from './add-to-favorite-icon'
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
        {company.items.map((item: Item) => (
          <div
            key={item.id}
            className="flex flex-col items-center space-y-4 border border-gray-200 p-4"
          >
            {/* user?.role === ROLE.USER */}

            {user?.id && (
              <AddToFavoriteIcon
                itemId={item.id}
                userId={user.id}
                filled={
                  favoritesList.items.find(
                    (fav: FavoriteItems) => fav.id === item.id,
                  )?.id
                }
              />
            )}

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
