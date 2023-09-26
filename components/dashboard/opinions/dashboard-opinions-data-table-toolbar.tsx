'use client'

import { CheckIcon, PlusCircleIcon, X } from 'lucide-react'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { DataTableViewOptions } from '@/components/data-table-view-options'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandGroup,
  CommandList,
  CommandItem,
} from '@/components/ui/command'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

const columns_name_map: { [key: string]: string } = {
  createdAt: 'Fecha',
  itemName: 'Servicio',
  comment: 'Comentario',
  rating: 'Calificacion',
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

const selectFilterOption = (table: Table<any>, filter: string) => {
  table.setColumnFilters([
    {
      id: filter,
      value: table.getState().columnFilters[0]?.value,
    },
  ])
}

export function DashboardOpinionsDataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [selectedFilter, setSelectedFilter] = useState<string>('comment')
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filtrar por ${columns_name_map[selectedFilter]}...`}
          onChange={(e) => {
            table.getColumn(selectedFilter)?.setFilterValue(e.target.value)
          }}
          className="h-8 w-1/3"
        />

        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Borrar
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Filtrar por
              <div className="space-x-1 flex ml-2">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {columns_name_map[selectedFilter]}
                </Badge>
              </div>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedFilter('comment')
                      selectFilterOption(table, 'comment')
                    }}
                  >
                    {selectedFilter === 'comment' ? (
                      <CheckIcon className="h-4 w-4 mr-2" />
                    ) : (
                      <div className="h-4 w-4 mr-2" />
                    )}
                    <span className="p-1">Comentario</span>
                  </CommandItem>

                  <CommandItem
                    onSelect={() => {
                      setSelectedFilter('itemName')
                      selectFilterOption(table, 'itemName')
                    }}
                  >
                    {selectedFilter === 'itemName' ? (
                      <CheckIcon className="h-4 w-4 mr-2" />
                    ) : (
                      <div className="h-4 w-4 mr-2" />
                    )}
                    <span className="p-1">Servicio</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <DataTableViewOptions table={table} columnNames={columns_name_map} />
    </div>
  )
}
