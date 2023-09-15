'use client'

import React, { useEffect, useState } from 'react'
import { UserOpinionsQuery } from '@/app/manada/opiniones/page'
import MobileListPagination from '@/components/mobile-list-pagination'

import MobileListCard from './mobile-list-card'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CheckIcon, PlusCircleIcon, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'

interface MobileListProps {
  opinions: UserOpinionsQuery[]
}

const columns_name_map: { [key: string]: string } = {
  itemName: 'Servicio',
  comment: 'Comentario',
  company: 'Empresa',
}

export default function MobileList({ opinions }: MobileListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedFilter, setSelectedFilter] = useState<string>('comment')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredOpinions, setFilteredOpinions] = useState(opinions)

  const indexOfLastPost = currentPage * itemsPerPage
  const indexOfFirstPost = indexOfLastPost - itemsPerPage
  const currentItems = filteredOpinions.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(filteredOpinions.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    if (searchQuery) {
      const filteredOpinions = opinions.filter((opinion) => {
        if (selectedFilter === 'company' && opinion[selectedFilter]?.name) {
          return opinion[selectedFilter]?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        }
        return (opinion[selectedFilter as keyof UserOpinionsQuery] as string)
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      })

      setFilteredOpinions(filteredOpinions)
      setCurrentPage(1)
    } else {
      setFilteredOpinions(opinions)
    }
  }, [opinions, searchQuery, selectedFilter])

  return (
    <div className="w-full block md:hidden">
      {/* FILTERS */}

      <div className="flex items-center justify-between py-4">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder={`Filtrar por ${columns_name_map[selectedFilter]}...`}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
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

                    <CommandItem onSelect={() => setSelectedFilter('company')}>
                      {selectedFilter === 'company' ? (
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

          {selectedFilter && searchQuery && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedFilter('')
                setSearchQuery('')
              }}
              className="h-8 px-2 lg:px-3"
            >
              Borrar
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* LIST */}

      <div className="space-y-2 w-full">
        {currentItems.map((opinion, index) => {
          return (
            <MobileListCard
              key={opinion.id}
              opinion={opinion}
              position={indexOfLastPost + index - itemsPerPage}
            />
          )
        })}
      </div>

      <MobileListPagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredOpinions.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
      />
    </div>
  )
}
