'use client'

import React from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { CATEGORIES_NAME } from '@/lib/categories'
import { Search } from 'lucide-react'
import { statesOfMexico } from '@/lib/states-of-mexico'
import { cn, normalizeString, slugify } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { SEARCH_WORDS } from '@/lib/search-words'
import { useRouter } from 'next/navigation'

type page = 'STATES' | 'CATEGORIES'

export default function SearchCommand({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [query, setQuery] = React.useState('buscar')
  const [activePage, setActivePage] = React.useState<page>('CATEGORIES')
  const router = useRouter()

  const openCommand = () => {
    setOpen(true)
    setSearch('')
  }

  return (
    <>
      <div
        className={cn('relative text-gray-600 animate-slide-down', className)}
      >
        <input
          type="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          placeholder="Que necesita tu perro?"
          className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-purple-500 border-gray-600 border min-w-[340px]"
          onClick={() => openCommand()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') openCommand()
          }}
        />
        <div className="absolute right-0 top-0 mt-3 mr-4">
          <Search className=" h-4 w-4" />
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command
          filter={(value, search) => {
            const normalizedValue = normalizeString(value)
            const normalizedSearch = normalizeString(search)

            if (normalizedValue.includes(normalizedSearch)) return 1
            return 0
          }}
          onKeyDown={(e) => {
            // Escape goes to previous page
            // Backspace goes to previous page when search is empty
            if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
              e.preventDefault()
              setActivePage('CATEGORIES')

              if (!activePage) {
                setOpen((open) => !open)
              }
            }

            // delete query if we leave the page states
            if (e.key === 'Backspace' && activePage === 'STATES' && !search) {
              e.preventDefault()
              setQuery('buscar')
            }
          }}
        >
          <CommandInput
            placeholder="Buscar..."
            value={search}
            onValueChange={setSearch}
          />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {activePage === 'CATEGORIES' && (
              <>
                <CommandGroup className="overflow-scroll" heading="Categorias">
                  {CATEGORIES_NAME.map((category) => {
                    return (
                      <CommandItem
                        key={category.name}
                        onSelect={() => {
                          setActivePage('STATES')

                          setQuery(
                            (query) =>
                              query + '?categoria=' + slugify(category.name),
                          )
                        }}
                      >
                        {category.name}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Sugerencias">
                  {SEARCH_WORDS.map((wordObject) => {
                    return wordObject.words.map((word) => {
                      return (
                        <CommandItem
                          key={word}
                          className="capitalize"
                          onSelect={() => {
                            setActivePage('STATES')

                            setQuery(
                              (query) =>
                                query + '?categoria=' + wordObject.slug,
                            )

                            setSearch('')
                          }}
                        >
                          {`${word}: ${wordObject.category}`}
                        </CommandItem>
                      )
                    })
                  })}
                </CommandGroup>
              </>
            )}

            {/* <CommandSeparator /> */}

            {activePage === 'STATES' && (
              <CommandGroup heading="Estados">
                <CommandItem className="flex items-center space-x-2">
                  <Switch
                    id="allow-online-services"
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setQuery((query) => query + `&online=true`)
                      } else {
                        setQuery((query) =>
                          query.split('&online=true').join(''),
                        )
                      }
                    }}
                  />
                  <Label htmlFor="allow-online-services" className="w-full">
                    Mostrar servicios en linea
                  </Label>
                </CommandItem>

                <CommandSeparator />

                {statesOfMexico.map((state) => {
                  return (
                    <CommandItem
                      key={state.value}
                      onSelect={() =>
                        router.push(query + `&lugar=${state.slug}`)
                      }
                    >
                      {state.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
