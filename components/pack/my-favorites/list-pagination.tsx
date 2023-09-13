'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'
import React from 'react'

interface ListPaginationProps {
  itemsPerPage: number
  totalItems: number
  paginate: (number: number) => void
  previousPage: () => void
  nextPage: () => void
  currentPage: number
}

const ListPagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  previousPage,
  nextPage,
  currentPage,
}: ListPaginationProps) => {
  console.log(totalItems, itemsPerPage)
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex justify-center gap-1 text-xs items-center font-medium py-6">
      <Button
        variant="outline"
        className="h-8 w-8 p-0 flex"
        onClick={() => paginate(1)}
        disabled={currentPage === 1 || totalItems === 0}
      >
        <span className="sr-only">Ir a la primera página</span>
        <ChevronsLeftIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => previousPage()}
        disabled={currentPage === 1 || totalItems === 0}
      >
        <span className="sr-only">Ir a la página anterior</span>
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <div
        className={cn(
          buttonVariants({
            variant: 'outline',
          }),
          'h-8 w-8 p-0',
        )}
      >
        <span className="sr-only">Pagina numero {currentPage}</span>
        {currentPage}
      </div>

      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => nextPage()}
        disabled={currentPage === pageNumbers.length || totalItems === 0}
      >
        <span className="sr-only">Ir a la página siguiente</span>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        className="h-8 w-8 p-0 flex"
        onClick={() => paginate(pageNumbers.length)}
        disabled={currentPage === pageNumbers.length || totalItems === 0}
      >
        <span className="sr-only">Ir a la ultima página</span>
        <ChevronsRightIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default ListPagination
