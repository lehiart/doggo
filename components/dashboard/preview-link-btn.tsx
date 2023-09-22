'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'
import { EyeIcon } from 'lucide-react'
import { useDashboardContext } from './dashboard-context'

export default function PreviewLinkButton() {
  const { selectedCompany } = useDashboardContext()

  return (
    <Link
      target="_blank"
      className={cn(
        buttonVariants({
          variant: 'outline',
        }),
      )}
      href={`/empresa/${selectedCompany?.slug}?preview=true`}
    >
      <EyeIcon className="w-5 h-5 mr-2" />
      <span className="text-sm whitespace-nowrap">Vista previa</span>
    </Link>
  )
}
