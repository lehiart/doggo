import { Button } from '@/components/ui/button'
import { Item, Request } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ChevronRightCircleIcon } from 'lucide-react'

import Link from 'next/link'

export const columns: ColumnDef<Request>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))

      return (
        <div className="text-center font-medium">
          {date.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estatus
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue('status')

      return (
        <div className="text-center font-medium">
          {status === 'PENDING' && 'Pendiente'}
          {status === 'ACCEPTED' && 'Aceptado'}
          {status === 'REJECTED' && 'Rechazado'}
        </div>
      )
    },
  },
  {
    accessorKey: 'message',
    header: () => <div className="text-center">Mensaje</div>,
  },
  {
    accessorKey: 'selectedItems',
    header: () => <div className="text-center">Items</div>,
    cell: ({ row }) => {
      const amount = JSON.parse(row.getValue('selectedItems'))
      let formatted = 'sin items'

      if (amount?.length > 0) {
        formatted = amount.map((item: Item) => item.title).join(', ')
      }

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const clientRequest = row.original

      return (
        <Link href={`/dashboard/clientes/${clientRequest.id}`}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <ChevronRightCircleIcon className="h-4 w-4 mr-2" />
          </Button>
        </Link>
      )
    },
  },
]
