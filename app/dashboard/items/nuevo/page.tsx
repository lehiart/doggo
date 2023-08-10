import React from 'react'

import { Sidebar } from './sidebar'
import NewItemForm from '@/components/dashboard/items/new-item-form'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'

async function NewItemPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <NewItemForm userId={user.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewItemPage
