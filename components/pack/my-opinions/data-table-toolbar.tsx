'use client'

import { CheckIcon, PlusCircleIcon } from 'lucide-react'
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
  company_name: 'Empresa',
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [selectedFilter, setSelectedFilter] = useState<string>('comment')

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filtrar por ${columns_name_map[selectedFilter]}...`}
          value={
            (table.getColumn(selectedFilter)?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn(selectedFilter)?.setFilterValue(event.target.value)
          }
          className="h-8 w-1/3"
        />

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
                  <CommandItem onSelect={() => setSelectedFilter('comment')}>
                    {selectedFilter === 'comment' ? (
                      <CheckIcon className="h-4 w-4 mr-2" />
                    ) : (
                      <div className="h-4 w-4 mr-2" />
                    )}
                    <span className="p-1">Comentario</span>
                  </CommandItem>

                  <CommandItem onSelect={() => setSelectedFilter('itemName')}>
                    {selectedFilter === 'itemName' ? (
                      <CheckIcon className="h-4 w-4 mr-2" />
                    ) : (
                      <div className="h-4 w-4 mr-2" />
                    )}
                    <span className="p-1">Servicio</span>
                  </CommandItem>

                  <CommandItem
                    onSelect={() => setSelectedFilter('company_name')}
                  >
                    {selectedFilter === 'company_name' ? (
                      <CheckIcon className="h-4 w-4 mr-2" />
                    ) : (
                      <div className="h-4 w-4 mr-2" />
                    )}
                    <span className="p-1">Empresa</span>
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
