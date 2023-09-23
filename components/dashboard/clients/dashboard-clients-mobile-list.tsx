'use client'

import React, { useEffect, useState } from 'react'
import { UserRequestQuery } from '@/app/manada/solicitudes/page'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
  CheckCircleIcon,
  CheckIcon,
  HourglassIcon,
  PlusCircleIcon,
  X,
  XCircleIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import MobileListPagination from '@/components/mobile-list-pagination'
import { Status } from '@prisma/client'
import DashboardClientsMobileListCard from './dashboard-clients-mobile-list-card'

interface MobileListProps {
  requests: UserRequestQuery[]
}

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

export default function DashboardClientsMobileList({
  requests,
}: MobileListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [selectedValues, setSelectedValues] = useState(new Set())
  const [filteredRequests, setFilteredRequests] =
    useState<UserRequestQuery[]>(requests)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const indexOfLastPost = currentPage * itemsPerPage
  const indexOfFirstPost = indexOfLastPost - itemsPerPage
  const currentItems = filteredRequests.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(filteredRequests.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    // If selectedValues is empty, show all requests
    let filtered = [...requests]

    if (selectedValues.size > 0) {
      // Filter requests based on selectedValues
      filtered = requests.filter((request) =>
        Array.from(selectedValues).includes(request.status),
      )
    }

    if (searchQuery) {
      // Filter requests based on the search query
      filtered = filtered.filter((request) =>
        request.message.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredRequests(filtered)
    // Reset currentPage when filter changes
    setCurrentPage(1)
  }, [selectedValues, requests, searchQuery])

  return (
    <div className="md:hidden w-full">
      <div className="flex items-center gap-2 justify-start py-4">
        {/* Message Search Input */}
        <Input
          type="text"
          placeholder="Buscar mensajes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-8 w-1/2"
        />

        {/* STATUS FILTER */}

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Estatus
              {selectedValues?.size >= 1 ? (
                <Separator orientation="vertical" className="mx-2 h-4" />
              ) : null}
              {selectedValues?.size > 1 ? (
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedValues.size}
                </Badge>
              ) : (
                <div className="space-x-1">
                  {statuses
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))}
                </div>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-full">
            <Command>
              <CommandList>
                <CommandGroup>
                  {statuses.map((option) => {
                    const isSelected = selectedValues.has(option.value)

                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          const newSelectedValues = new Set(selectedValues)

                          if (isSelected) {
                            newSelectedValues.delete(option.value)
                          } else {
                            newSelectedValues.add(option.value)
                          }

                          setSelectedValues(newSelectedValues)
                        }}
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible',
                          )}
                        >
                          <CheckIcon className={cn('h-4 w-4')} />
                        </div>

                        {option.icon && (
                          <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}

                        <span>{option.label}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>

                {selectedValues.size > 0 && (
                  <>
                    <CommandSeparator />

                    <CommandGroup>
                      <CommandItem
                        onSelect={() => setSelectedValues(new Set())}
                        className="justify-center text-center"
                      >
                        Limpiar filtros
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* CLEAR STATUS FILTER */}

        {selectedValues.size > 0 && (
          <Button
            variant="ghost"
            onClick={() => setSelectedValues(new Set())}
            className="h-8 px-2 lg:px-3"
          >
            Borrar
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* CARDS LIST */}

      <div className="grid grid-cols-1 gap-4">
        {currentItems.map((request, index) => (
          <DashboardClientsMobileListCard
            key={request.id}
            request={request}
            position={indexOfLastPost + index - itemsPerPage}
          />
        ))}
      </div>

      <MobileListPagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredRequests.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
      />
    </div>
  )
}
