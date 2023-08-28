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
import { statesOfMexico } from '@/lib/states-of-mexico'
import { Input } from '@/components/ui/input'
import { normalizeString } from '@/lib/utils'

export default function StatesGrid() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [filterText, setFilterText] = React.useState('')

  const handleFilterTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value)
  }

  const filteredStates = statesOfMexico.filter((state) =>
    normalizeString(state.label).includes(normalizeString(filterText)),
  )

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-12">
      <div className="pb-2" id="estados">
        <h2 className="text-3xl font-bold sm:text-4xl mb-4">
          Estados{' '}
          <span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Abrir y Cerrar</span>
              </Button>
            </CollapsibleTrigger>
          </span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <p className="tracking-light text-xl">
            Explora los servicios disponibles en tu estado.
          </p>
          {isOpen && (
            <Input
              type="text"
              placeholder="Buscar estado..."
              value={filterText}
              onChange={handleFilterTextChange}
              className="w-[300px] mt-6 md:mt-0"
            />
          )}
        </div>
      </div>

      <CollapsibleContent id="content">
        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {filteredStates.map((state) => (
            <Link key={state.value} href={`/explorar/lugares/${state.slug}`}>
              <div className="flex h-full items-center justify-center rounded-xl border p-6  text-center shadow-lg transition hover:border-primary hover:shadow-primary/20">
                <h2 className="text-md font-bold ">{state.label}</h2>
              </div>
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
