'use client'

import React, { useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDownIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { statesOfMexico } from '@/lib/states-of-mexico'

interface StatesSelectorProps {
  control: any
  inputName: string
  className?: string
}

export function StatesSelector({ control, inputName }: StatesSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Controller
        control={control}
        name={inputName}
        render={({ field: { onChange, value } }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  'w-full justify-between',
                  !value && 'text-muted-foreground',
                )}
              >
                {value
                  ? statesOfMexico.find((state) => state.value === value)?.label
                  : 'Selecciona el estado'}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[--radix-popper-anchor-width] p-0">
              <Command>
                <CommandInput placeholder="Buscar estado..." />
                <CommandEmpty className="p-4">
                  No se encontro ningun estado con ese nombre.
                </CommandEmpty>
                <CommandGroup className="h-[200px] overflow-y-scroll">
                  {statesOfMexico.map((state) => (
                    <CommandItem
                      value={state.value}
                      key={state.value}
                      onSelect={(value) => {
                        onChange(value)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          state.value === value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {state.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  )
}
