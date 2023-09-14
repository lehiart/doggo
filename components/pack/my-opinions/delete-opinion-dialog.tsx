'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useState } from 'react'

import { DialogClose } from '@radix-ui/react-dialog'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

interface DeleteOpinionDialogProps {
  id: string
  closeDialog: () => void
}

export default function DeleteOpinionDialog({
  id,
  closeDialog,
}: DeleteOpinionDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const deleteOpinion = async (id: string) => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/opinions/delete/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Opinion eliminada',
          description: 'La opinion fue eliminada con exito',
        })

        router.refresh()
      } else {
        toast({
          title: 'Error',
          description:
            'No se pudo eliminar la opinion, si el error persiste contacta a soporte',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          'No se pudo eliminar la opinion, si el error persiste contacta a soporte',
      })
    }

    setIsLoading(false)
    closeDialog()
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Eliminar opinion</DialogTitle>
        <DialogDescription>
          Recuerda que las opiniones que das son públicas y pueden ser vistas
          por cualquier persona.
        </DialogDescription>
        <DialogDescription>No incluyas información personal.</DialogDescription>
      </DialogHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          deleteOpinion(id)
        }}
      >
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isLoading} variant="destructive">
            {isLoading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

// <AlertDialog open={open} onOpenChange={setOpen}>
//   <AlertDialogTrigger>
//     <DropdownMenuItem
//       onSelect={(event) => {
//         event.preventDefault()
//       }}
//     >
//       <XCircleIcon className="w-4 h-4 mr-2" />
//       Eliminar opinion
//     </DropdownMenuItem>
//   </AlertDialogTrigger>

//   <AlertDialogContent>
//     <AlertDialogHeader>
//       <AlertDialogTitle>
//         Estas seguro de querer eliminar esta opinion?
//       </AlertDialogTitle>
//       <AlertDialogDescription>
//         Esta accion no se puede deshacer, una vez eliminada la opinion no se
//         podra recuperar.
//       </AlertDialogDescription>
//       <AlertDialogDescription>
//         Recuerda que puedes editar la opinion si solo quieres cambiar algo.
//       </AlertDialogDescription>
//     </AlertDialogHeader>
//     <form
//       onSubmit={(e) => {
//         e.preventDefault()
//         deleteOpinion(id)
//       }}
//     >
//       <AlertDialogFooter className="mt-6">
//         <AlertDialogCancel>Cancelar</AlertDialogCancel>
//         <Button variant="destructive" type="submit" disabled={isLoading}>
//           {isLoading ? 'Eliminando...' : 'Eliminar'}
//         </Button>
//       </AlertDialogFooter>
//     </form>
//   </AlertDialogContent>
// </AlertDialog>
