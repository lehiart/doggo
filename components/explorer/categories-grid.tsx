'use client'

import React, { ChangeEvent } from 'react'
import Link from 'next/link'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Category } from '@prisma/client'
import { normalizeString } from '@/lib/utils'
import { Input } from '../ui/input'

interface CategoriesGridProps {
  categories: Category[]
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [filterText, setFilterText] = React.useState('')

  const handleFilterTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value)
  }

  const filteredCategories = categories.filter((category) =>
    normalizeString(category.name).includes(normalizeString(filterText)),
  )
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-16">
      <div className="pb-2" id="categorias">
        <h2 className="text-3xl font-bold sm:text-4xl mb-4">
          Categorias{' '}
          <span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Abrir y Cerrar</span>
              </Button>
            </CollapsibleTrigger>
          </span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <p className="tracking-light text-xl">
            Explora las principales categorias de servicios para tu perro.
          </p>
          {isOpen && (
            <Input
              type="text"
              placeholder="Buscar categoria..."
              value={filterText}
              onChange={handleFilterTextChange}
              className="w-[300px] mt-6 md:mt-0"
            />
          )}
        </div>
      </div>

      <CollapsibleContent id="content">
        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/explorar/categorias/${category.slug}`}
            >
              <div className="flex h-full items-center justify-center rounded-xl border p-6 shadow-lg text-center transition hover:border-primary hover:shadow-primary/20">
                <h2 className="text-md font-bold ">{category.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
