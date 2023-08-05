'use client'

import { ChevronDown, CheckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Dialog } from '@/components/ui/dialog'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Company } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useDashboardContext } from './dashboard-context'

type BasicCompanyData = Pick<Company, 'id' | 'pro' | 'name'>

interface CompanySelectInputProps {
  companies: BasicCompanyData[]
}

export default function CompanySelectInput({
  companies,
}: CompanySelectInputProps) {
  const [open, setOpen] = useState(false)
  const { selectedCompany, setSelectedCompany } = useDashboardContext()

  useEffect(() => {
    // Check if selectedCompany is null and companies array is not empty
    if (!selectedCompany && companies.length > 0) {
      // Set the first company as the selected company
      setSelectedCompany(companies[0])
    }
  }, [selectedCompany, companies, setSelectedCompany])

  const handleSelectedCompanyChange = (company: BasicCompanyData) => {
    setSelectedCompany(company)
    setOpen(false)
  }

  return (
    <Dialog>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={companies?.length === 0}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Elige un negocio"
            className="min-w-[200px] justify-between"
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${
                  selectedCompany?.id || companies[0].id || 'default'
                }.png`}
                alt={selectedCompany?.name || companies[0].name || undefined}
              />
              <AvatarFallback>DH</AvatarFallback>
            </Avatar>
            {selectedCompany?.name || companies[0].name}
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Buscar..." />
              <CommandEmpty>No encontrado.</CommandEmpty>
              <CommandGroup heading="Mis negocios">
                {companies &&
                  companies.length > 0 &&
                  companies.map((company: BasicCompanyData) => (
                    <CommandItem
                      key={company.id}
                      onSelect={() => handleSelectedCompanyChange(company)}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${company.id}.png`}
                          alt={company.name || 'Negocio'}
                          // className='grayscale'
                        />
                        <AvatarFallback>DH</AvatarFallback>
                      </Avatar>
                      {company.name}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          selectedCompany?.id === company.id
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  )
}
