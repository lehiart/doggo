'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table-column-header'

import { UserOpinionsQuery } from '@/app/manada/opiniones/page'

import ActionsColumn from './actions-columns'
import { StarIcon } from 'lucide-react'

export const columns: ColumnDef<UserOpinionsQuery>[] = [
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
    accessorKey: 'itemName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Servicio" />
    ),
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comentario" />
    ),
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Calificación" />
    ),
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number

      const stars = Array(5)
        .fill(null)
        .map((_, index) => (
          <StarIcon
            key={index}
            fill={index < rating ? 'yellow' : 'none'}
            className={`h-4 w-4 inline-flex ${
              index < rating ? '' : 'opacity-20 dark:opacity-50'
            }`}
          />
        ))

      return <div>{stars}</div>
    },
  },
  {
    accessorKey: 'company.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Empresa" />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn opinionItem={row.original} />,
  },
]
