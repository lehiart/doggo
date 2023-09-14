'use client'

import React, { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { MoreHorizontal, XCircleIcon } from 'lucide-react'
import { ExternalLinkIcon, PencilIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { UserOpinionsQuery } from '@/app/manada/opiniones/page'
import EditOpinionDialog from './edit-opinion-dialog'
import DeleteOpinionDialog from './delete-opinion-dialog'

interface ActionsColumnProps {
  opinionItem: UserOpinionsQuery
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000))

enum DialogType {
  EDIT,
  DELETE,
}

export default function ActionsColumn({ opinionItem }: ActionsColumnProps) {
  const [open, setOpen] = useState(false)
  const [dialogType, setDialogType] = useState(DialogType.EDIT)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setDialogType(DialogType.EDIT)}>
              <PencilIcon className="w-4 h-4 mr-2" />
              Editar opinion
            </DropdownMenuItem>
          </DialogTrigger>

          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setDialogType(DialogType.DELETE)}>
              <XCircleIcon className="w-4 h-4 mr-2" />
              Eliminar opinion
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={`/empresa/${opinionItem.company.slug}`}>
              <ExternalLinkIcon className="h-4 w-4 mr-2" />
              Ver empresa
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/empresa/${opinionItem.company.slug}#${opinionItem.itemName}`}
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
          opinionId={opinionItem.id}
          name={opinionItem.itemName}
          rating={opinionItem.rating}
          comment={opinionItem.comment}
          closeDialog={() => wait().then(() => setOpen(false))}
        />
      ) : (
        <DeleteOpinionDialog
          id={opinionItem.id}
          closeDialog={() => wait().then(() => setOpen(false))}
        />
      )}
    </Dialog>
  )
}
