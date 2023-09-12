'use client'

import { CheckCircleIcon, HourglassIcon, X, XCircleIcon } from 'lucide-react'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'
import { Status } from '@prisma/client'

export const statuses = [
  {
    value: Status.ACCEPTED,
    label: 'Aceptada',
    icon: CheckCircleIcon,
  },
  {
    value: Status.PENDING,
    label: 'Pendiente',
    icon: HourglassIcon,
  },
  {
    value: Status.REJECTED,
    label: 'Rechazada',
    icon: XCircleIcon,
  },
]

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar por mensaje..."
          value={(table.getColumn('message')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('message')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <div className="hidden md:block">
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title="Estatus"
              options={statuses}
            />
          )}
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Borrar
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  )
}
