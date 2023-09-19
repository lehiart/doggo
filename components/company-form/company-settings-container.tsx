import React from 'react'
import { Category, Company } from '@prisma/client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { DogIcon, PencilIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import DeleteCard from '../dashboard/delete-card'

interface CompanySettingsContainerProps {
  company: Company & {
    categories: Category[]
  }
}

interface SocialMediaLink {
  name: string
  url: string
  id: string
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-mx', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatCategory = (categories: Category[]) => {
  return categories.map((category) => category.name).join(', ')
}

const formatAddress = (
  streetAddress: string | null,
  streetAddress2: string | null,
  city: string | null,
  locality: string | null,
  state: string | null,
  zip: string | null,
) => {
  return `${streetAddress} ${streetAddress2}, ${city}, ${locality}, ${state}, ${zip}`
}

const formatSocialMediaLinks = (socialMediaLinks: string | null) => {
  if (!socialMediaLinks) return null

  return JSON.parse(socialMediaLinks).map((item: SocialMediaLink) => item.url)
}

export default function CompanySettingsContainer({
  company,
}: CompanySettingsContainerProps) {
  return (
    <Card>
      <CardHeader className="p-0 w-full relative h-64">
        <div className="bg-white">
          <Badge className="absolute z-10 right-2 top-2" variant="secondary">
            {company.pro ? 'PLAN PRO' : 'PLAN GRATUITO'}
          </Badge>

          <div className="rounded-t-lg h-32 overflow-hidden relative">
            <Image
              className="object-cover object-top w-full"
              src="/images/dog-placeholder.jpg"
              alt="Mountain"
              fill
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            {company.image ? (
              <Image
                className="object-cover object-center h-32"
                src={company.image}
                alt="Woman looking front"
                height={200}
                width={200}
              />
            ) : (
              <div className="object-cover object-center h-full w-full ">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  <span className="sr-only">{company.name}</span>
                  <DogIcon className="w-2/3 h-2/3" />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardHeader className="-mt-16">
        <CardTitle className="break-words">{company.name}</CardTitle>
        <CardDescription className="break-words">
          {company.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid space-y-4 grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>Creado</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {formatDate(company.createdAt)}
              </span>
            </Label>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>Email</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {company.email}
              </span>
            </Label>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>Telefono</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {company.phone}
              </span>
            </Label>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>Categorias</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {formatCategory(company.categories)}
              </span>
            </Label>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>Sitio Web</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {company.website}
              </span>
            </Label>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>Direccion</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {formatAddress(
                  company.streetAddress,
                  company.streetAddress2,
                  company.city,
                  company.locality,
                  company.state,
                  company.zip,
                )}
              </span>
            </Label>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>Links sociales</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {formatSocialMediaLinks(company.socialMediaLinks)}
              </span>
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 md:gap-6 justify-between md:justify-center w-full mt-8">
          <Link
            href={`/dashboard/ajustes/editar/${company.id}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
              }),
              'w-1/2 lg:w-1/4',
            )}
          >
            <PencilIcon className="mr-2 h-4 w-4" />
            Editar
          </Link>

          <DeleteCard companyId={company.id} />
        </div>
      </CardFooter>
    </Card>
  )
}
