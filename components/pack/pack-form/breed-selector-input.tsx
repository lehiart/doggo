'use-client'

import * as React from 'react'
import { CheckIcon, ChevronsUpDown, InfoIcon } from 'lucide-react'

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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { breeds } from '../../../lib/breeds'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export function BreedSelector({ form }: any) {
  const [open, setOpen] = React.useState(false)

  return (
    <FormField
      control={form.control}
      name="breed"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel className="mb-1 flex justify-between">
            <p>
              Raza <span className="text-red-500">*</span>
            </p>
            <HoverCard>
              <HoverCardTrigger asChild>
                <InfoIcon className="h-4 w-4 mr-1" />
              </HoverCardTrigger>
              <HoverCardContent className="text-center">
                Si tu perro es de raza unica, selecciona Mestizo o la raza que
                más se le parezca.
              </HoverCardContent>
            </HoverCard>
          </FormLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-auto justify-between',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value
                    ? breeds.find(
                        (breed) => breed.value.toLowerCase() === field.value,
                      )?.label
                    : 'Selecciona una raza'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="p-0">
              <Command className="w-full ">
                <CommandInput placeholder="Buscar..." />
                <CommandEmpty>No encontramos esa raza.</CommandEmpty>
                <CommandGroup className="h-[200px] overflow-y-scroll">
                  {breeds.map((breed) => (
                    <CommandItem
                      value={breed.value}
                      key={breed.value}
                      onSelect={(value) => {
                        form.setValue('breed', value, { shouldValidate: true })
                        setOpen(false)
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          breed.value === field.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {breed.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
