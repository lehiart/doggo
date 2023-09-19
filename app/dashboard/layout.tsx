import { Metadata } from 'next'

import { ROLE } from '@/lib/constants'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'
import EmptyInitialScreen from '../../components/dashboard/empty-iinitial-screen'

import CompanySelectInput from '../../components/dashboard/company-select-input'
import { DashboardContextProvider } from '../../components/dashboard/dashboard-context'
import { Separator } from '@/components/ui/separator'
import MobileHeaderLinks from '@/components/dashboard/mobile-header-links'
import PreviewLinkButton from '@/components/dashboard/preview-link-btn'
import DesktopHeaderLinks from '@/components/dashboard/desktop-header-links'

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
          slug: true,
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
      <section className="h-screen container">
        <div className="flex flex-col h-screen">
          <EmptyInitialScreen />
        </div>
      </section>
    )
  }

  return (
    <DashboardContextProvider>
      <section className="min-h-screen container">
        <div className="flex flex-col h-full">
          <div className="flex h-16 items-center w-full gap-1 justify-between">
            <CompanySelectInput companies={data.companies} />
            <DesktopHeaderLinks />
            <PreviewLinkButton />
          </div>

          <MobileHeaderLinks />

          <Separator className="container my-4 xl:my-2" />

          {children}
        </div>
      </section>
    </DashboardContextProvider>
  )
}
