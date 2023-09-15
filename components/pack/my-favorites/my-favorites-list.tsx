'use client'

import { MyFavoritesQuery } from '@/app/manada/favoritos/page'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckIcon, MapPinIcon, PlusCircleIcon, WifiIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ListPagination from './list-pagination'
import { cn, getStateFromKey } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandInput,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import HeartButton from './heart-button'

interface MyFavoritesListProps {
  items: MyFavoritesQuery[]
}

function filterArrayByCriteria<T>(
  array: T[],
  filterFunc: (item: T) => boolean,
): T[] {
  return array.filter(filterFunc)
}

export default function MyFavoritesList({ items }: MyFavoritesListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredItems, setFilteredItems] = useState(items)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const indexOfLastPost = currentPage * itemsPerPage
  const indexOfFirstPost = indexOfLastPost - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(items.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleSelectFilter = (name: string) => {
    // Check if the filter is already selected
    if (selectedFilters.includes(name)) {
      // Deselect the filter by removing it from the selectedFilters array
      setSelectedFilters((prevSelectedFilters) =>
        prevSelectedFilters.filter((filter) => filter !== name),
      )
    } else {
      // Select the filter by adding it to the selectedFilters array
      setSelectedFilters((prevSelectedFilters) => [
        ...prevSelectedFilters,
        name,
      ])
    }
  }

  useEffect(() => {
    // Create a filtering function based on selectedFilters
    const filterBySelectedCompany = (item: MyFavoritesQuery) => {
      return (
        selectedFilters.length === 0 ||
        selectedFilters.includes(item.company.name)
      )
    }

    let filtered = filterArrayByCriteria(items, filterBySelectedCompany)

    if (searchQuery) {
      // Filter requests based on the search query
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredItems(filtered)
    // Reset currentPage when filter changes
    setCurrentPage(1)
  }, [items, searchQuery, selectedFilters])

  return (
    <div className="w-full">
      <div className="w-full flex gap-4">
        <Input
          placeholder="Buscar por nombre..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-10 border-dashed">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Empresa
              {selectedFilters?.length >= 1 ? (
                <>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedFilters.length}
                  </Badge>
                  x
                </>
              ) : null}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[300px]">
            <Command>
              <CommandInput placeholder="Buscar..." />

              <CommandList>
                <CommandEmpty>No hubo resultados.</CommandEmpty>

                <CommandGroup>
                  {Array.from(
                    new Set(items.map((item) => item.company.name)),
                  ).map((name) => {
                    return (
                      <CommandItem
                        key={name}
                        onSelect={() => handleSelectFilter(name)}
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            selectedFilters.includes(name)
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible',
                          )}
                        >
                          <CheckIcon className={cn('h-4 w-4')} />
                        </div>

                        <span>{name}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>

                {selectedFilters.length > 0 && (
                  <>
                    <CommandSeparator />

                    <CommandGroup>
                      <CommandItem
                        onSelect={() => setSelectedFilters([])}
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
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {currentItems.map((item) => (
          <Link
            key={item.id}
            href={`/empresa/${item.company.slug}/#${item.title}`}
            className="mx-auto my-0"
          >
            <Card className="hover:shadow-md h-full max-w-[500px] break-words break-all	">
              <CardHeader className="w-full p-0 relative">
                <Image
                  src="https://source.unsplash.com/IPheOySCW7A"
                  alt={`Imagen de portada de ${item.title}`}
                  width={500}
                  height={500}
                />

                <HeartButton />
              </CardHeader>
              <CardContent className="pt-6 relative">
                <CardTitle className="mb-4 break-words">{item.title}</CardTitle>
                <p className="break-words">Por: {item.company.name}</p>
                <CardDescription className="break-words">
                  {item.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                {item.onlineBusiness && (
                  <div className="flex gap-2 text-sm items-center">
                    <WifiIcon className="h-4 w-4" />
                    Servicio disponible en línea
                  </div>
                )}

                {item.state && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPinIcon className="h-4 w-4" />
                    {getStateFromKey(item.state)?.label}
                  </div>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </ul>

      <ListPagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
      />
    </div>
  )
}
