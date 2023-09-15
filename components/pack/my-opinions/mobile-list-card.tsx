import React, { useState } from 'react'
import { UserOpinionsQuery } from '@/app/manada/opiniones/page'
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  PencilIcon,
  StarIcon,
  XCircleIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import EditOpinionDialog from './edit-opinion-dialog'
import DeleteOpinionDialog from './delete-opinion-dialog'

interface MobileListCardProps {
  opinion: UserOpinionsQuery
  position: number
}

const parseDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-mx', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const createStars = (rating: number) => {
  const stars = Array(5)
    .fill(null)
    .map((_, index) => (
      <StarIcon
        key={index}
        fill={index < rating ? 'yellow' : 'none'}
        className={`h-4 w-4 inline-flex ${
          index < rating ? '' : 'opacity-20 dark:opacity-50'
        }`}
      />
    ))

  return stars
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000))

enum DialogType {
  EDIT,
  DELETE,
}

export default function MobileListCard({
  opinion,
  position,
}: MobileListCardProps) {
  const [open, setOpen] = useState(false)
  const [dialogType, setDialogType] = useState(DialogType.EDIT)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-2 grid grid-cols-[1fr_50px] items-center">
          Opinion {`#${position + 1}`}
          <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-2 shadow-none">
                  <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                alignOffset={-5}
                className="w-[200px]"
                forceMount
              >
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={() => setDialogType(DialogType.EDIT)}
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Editar opinion
                  </DropdownMenuItem>
                </DialogTrigger>

                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={() => setDialogType(DialogType.DELETE)}
                  >
                    <XCircleIcon className="w-4 h-4 mr-2" />
                    Eliminar opinion
                  </DropdownMenuItem>
                </DialogTrigger>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href={`/empresa/${opinion.company.slug}`}>
                    <ExternalLinkIcon className="h-4 w-4 mr-2" />
                    Ver empresa
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/empresa/${opinion.company.slug}#${opinion.itemName}`}
                  >
                    <ExternalLinkIcon className="h-4 w-4 mr-2" />
                    Ver servicio
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* DIALOG EDIT AND DELETE CONTENT */}
            {dialogType === DialogType.EDIT ? (
              <EditOpinionDialog
                opinionId={opinion.id}
                name={opinion.itemName}
                rating={opinion.rating}
                comment={opinion.comment}
                closeDialog={() => wait().then(() => setOpen(false))}
              />
            ) : (
              <DeleteOpinionDialog
                id={opinion.id}
                closeDialog={() => wait().then(() => setOpen(false))}
              />
            )}
          </Dialog>
        </CardTitle>

        <CardDescription className="break-words text-md py-2">
          {opinion.comment}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CardDescription className="break-words text-sm">
          Servicio: <span className="break-words">{opinion.itemName}</span>
        </CardDescription>
        <CardDescription className="break-words text-sm mb-2">
          Empresa: <span className="break-words">{opinion.company.name}</span>
        </CardDescription>

        <div className="flex space-x-4 text-sm text-muted-foreground justify-between">
          <div className="flex items-center">
            <span className="mr-1 text-bold text-md">{opinion.rating}</span>
            {createStars(opinion.rating)}
          </div>
          <div>{parseDate(opinion.createdAt)}</div>
        </div>
      </CardContent>
    </Card>
  )
}
