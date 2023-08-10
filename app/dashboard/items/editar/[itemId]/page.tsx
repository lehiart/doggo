import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Item } from '@prisma/client'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'

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
    <div className="block min-h-screen space-y-6 p-10 pb-16">
      item {params.itemId}
    </div>
  )
}
