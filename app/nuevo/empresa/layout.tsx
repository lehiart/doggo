import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nueva empresa',
  description: 'Crear una nueva empresa.',
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function NewCompanyLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <section className="min-h-screen container">
      <div className="flex flex-col h-full">{children}</div>
    </section>
  )
}
