import { Metadata } from 'next'

import { ROLE } from '@/lib/constants'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'
import EmptyInitialScreen from '../../components/dashboard/empty-iinitial-screen'

import CompanySelectInput from '../../components/dashboard/company-select-input'
import { DashboardContextProvider } from '../../components/dashboard/dashboard-context'
import DashboardMainHeader from '@/components/dashboard/dashboard-main-header'
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Administra tu negocio con el dashboard.',
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

async function getDashboardData() {
  const user = await getCurrentUser()

  if (!user || !user?.id) {
    redirect('/login')
  }

  const data = await db.user.findUnique({
    where: {
      role: ROLE.COMPANY,
      id: user.id,
    },
    select: {
      companies: {
        select: {
          id: true,
          name: true,
          pro: true,
        },
      },
    },
  })

  return data
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const data = await getDashboardData()

  if (!data?.companies || data?.companies.length === 0) {
    return (
      <section className="h-screen">
        <div className="flex flex-col h-screen">
          <EmptyInitialScreen />
        </div>
      </section>
    )
  }

  return (
    <DashboardContextProvider>
      <section className="h-full">
        <div className="flex flex-col h-full">
          <div className="border-b px-8">
            <div className="flex h-16 items-center">
              <CompanySelectInput companies={data.companies} />
              <DashboardMainHeader />
            </div>
          </div>

          {children}
        </div>
      </section>
    </DashboardContextProvider>
  )
}
