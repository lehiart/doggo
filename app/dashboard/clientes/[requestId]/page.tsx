import { Company, Item } from '@prisma/client'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

async function getCompanyClientRequests(requestId: string) {
  return await db.request.findUnique({
    where: {
      id: requestId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          profile: {
            select: {
              phone: true,
            },
          },
        },
      },
    },
  })
}

interface ClientRequestDetailsPageProps {
  params: { requestId: string }
}

export default async function ClientRequestDetailsPage({
  params,
}: ClientRequestDetailsPageProps) {
  if (!params.requestId) {
    redirect('/')
  }

  const requestDetails = await getCompanyClientRequests(params.requestId)

  if (!requestDetails) {
    redirect('/')
  }

  return (
    <div className="h-screen ">
      <Link href="/dashboard/clientes">
        <Button>Volver</Button>
      </Link>
      Pagina detalles solicitud de cliente
      <pre>{JSON.stringify(requestDetails, null, 2)}</pre>
      <Button>Cambiar status</Button>
    </div>
  )
}
