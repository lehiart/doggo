'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Company, Item } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'
import { UserRequestQuery } from '@/app/manada/solicitudes/page'
import { DataTableColumnHeader } from '@/components/data-table-column-header'

export const columns: ColumnDef<UserRequestQuery>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Fecha" />
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))

      const formatted = date.toLocaleDateString('es-MX', {
        year: '2-digit',
        month: '2-digit',
        day: 'numeric',
      })

      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estatus" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status')

      return (
        <div>
          {status === 'PENDING' && 'Pendiente'}
          {status === 'ACCEPTED' && 'Aceptado'}
          {status === 'REJECTED' && 'Rechazado'}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'message',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mensaje" />
    ),
  },
  {
    accessorKey: 'selectedItems',
    header: () => <div className="">Items</div>,
    cell: ({ row }) => {
      const amount = JSON.parse(row.getValue('selectedItems'))
      let formatted = 'sin items'

      if (amount?.length > 0) {
        formatted = amount.map((item: Item) => item.title).join(', ')
      }

      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'company',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Empresa" />
    ),
    cell: ({ row }) => {
      const company: Company = row.getValue('company')

      return (
        <div className="items-center gap-1 flex">
          {company.name}
          <Link
            href={`/empresa/${company.slug}`}
            className={cn(
              buttonVariants({
                variant: 'ghost',
              }),
              'h-8 w-8 p-0',
            )}
            target="_blank"
          >
            <span className="sr-only">
              Ir a pagina de la empresa {company.name}
            </span>
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      )
    },
  },
]
