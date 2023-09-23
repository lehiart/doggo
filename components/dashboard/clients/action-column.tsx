import React from 'react'

import { ExternalLinkIcon } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ActionsColumnProps {
  requestItemID: string
}

export default function ActionsColumn({ requestItemID }: ActionsColumnProps) {
  return (
    <Link
      href={`/dashboard/clientes/${requestItemID}`}
      className={
        (cn(
          buttonVariants({
            variant: 'ghost',
          }),
        ),
        'h-8 w-8 p-0')
      }
    >
      <span className="sr-only">Ver detalles</span>
      <ExternalLinkIcon className="h-4 w-4" />
    </Link>
  )
}
