import { getCurrentUser } from '@/lib/session'
import { Item } from '@prisma/client'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Sidebar } from '../../nuevo/sidebar'
import EditItemForm from '@/components/dashboard/items/edit-item-form'

async function getCompanyData(itemId: Item['id']) {
  return await db.item.findUnique({
    where: {
      id: itemId,
    },
  })
}

interface CompanyEditorPageProps {
  params: { itemId: string }
}

export default async function EditCompanyPage({
  params,
}: CompanyEditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const item: any = await getCompanyData(params.itemId)

  if (!item) {
    redirect('/dashboard/items')
  }

  return (
    <div className="border-t">
      <div className="bg-background">
        <div className="grid lg:grid-cols-5">
          <Sidebar />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <p>{params.itemId}</p>
              <p>{item.id}</p>
              <EditItemForm userId={user.id} item={item} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
