import { DataTableColumnHeader } from '@/components/data-table-column-header'
import { Item, Request } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import ActionsColumn from './action-column'

export const columns: ColumnDef<Request>[] = [
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
  },
  {
    accessorKey: 'message',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mensaje" />
    ),
  },
  {
    accessorKey: 'selectedItems',
    header: () => <div>Items</div>,
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
    id: 'actions',
    cell: ({ row }) => <ActionsColumn requestItemID={row.original.id} />,
  },
]
