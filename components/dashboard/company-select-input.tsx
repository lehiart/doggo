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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Company } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useDashboardContext } from './dashboard-context'
import { usePathname } from 'next/navigation'

type BasicCompanyData = Pick<Company, 'id' | 'pro' | 'name' | 'slug'>

interface CompanySelectInputProps {
  companies: BasicCompanyData[]
}

export default function CompanySelectInput({
  companies,
}: CompanySelectInputProps) {
  const [open, setOpen] = useState(false)
  const { selectedCompany, setSelectedCompany } = useDashboardContext()
  const pathname = usePathname()

  useEffect(() => {
    if (!selectedCompany) {
      setSelectedCompany(companies[0])
    }
  }, [selectedCompany, companies, setSelectedCompany])

  const handleSelectedCompanyChange = (company: BasicCompanyData) => {
    setSelectedCompany(company)

    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={
            companies?.length === 0 ||
            pathname === '/dashboard/items/nuevo' ||
            pathname.startsWith('/dashboard/items/editar') ||
            pathname.startsWith('/dashboard/clientes/')
          }
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Elige un negocio"
          className="w-1/2 md:w-1/4 justify-between "
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${selectedCompany?.id}.svg`}
              alt={selectedCompany?.name || companies[0].name || 'Avatar'}
            />
            <AvatarFallback>DH</AvatarFallback>
          </Avatar>
          <span className="line-clamp-1">
            {selectedCompany?.name || companies[0].name}
          </span>
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[--radix-popper-anchor-width]">
        <Command>
          <CommandList>
            <CommandInput placeholder="Buscar..." />
            <CommandEmpty>No encontrado.</CommandEmpty>
            <CommandGroup heading="Mis negocios">
              {companies?.length > 0 &&
                companies.map((company: BasicCompanyData) => (
                  <CommandItem
                    key={company.id}
                    onSelect={() => handleSelectedCompanyChange(company)}
                    className="text-sm"
                    value={company.slug}
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${company.id}.png`}
                        alt={company.name || 'Negocio'}
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
  )
}
