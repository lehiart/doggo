'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from '@/components/ui/use-toast'
import { Loader2Icon, Trash2Icon } from 'lucide-react'

export default function DeleteItemButton({
  itemId,
  removeItem,
}: {
  itemId: string
  removeItem: (id: string) => any
}) {
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const handleDeleteConfirmClick = async () => {
    setIsDeleteLoading(true)

    try {
      const response = await removeItem(itemId)

      if (response.ok) {
        toast({
          title: 'Item eliminado',
          description:
            'Tu item ha sido eliminado correctamente. Esta acción no se puede deshacer.',
        })
      } else {
        toast({
          title: 'Hubo un error al eliminar tu negocio',
          variant: 'destructive',
          description:
            'Por favor intenta de nuevo más tarde. Si el problema persiste, contacta a soporte.',
        })
      }
    } catch (error) {
      toast({
        title: 'Hubo un error al eliminar tu negocio',
        variant: 'destructive',
        description:
          'Por favor intenta de nuevo más tarde. Si el problema persiste, contacta a soporte.',
      })
    }

    setIsDeleteLoading(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Eliminar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente tu
            negocio y removerá sus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteConfirmClick()}>
            {isDeleteLoading ? (
              <Loader2Icon className="mr-2 animate-spin" />
            ) : (
              <Trash2Icon className="mr-2" />
            )}
            <span>Continuar</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
