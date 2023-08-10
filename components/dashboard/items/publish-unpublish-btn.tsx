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
import { Loader2Icon, SendIcon } from 'lucide-react'

interface ButtonProps {
  isPublished: boolean
  updateItemPublishStatus: (id: string, isPublished: boolean) => Promise<void>
  itemId: string
}

export default function PublishUnpublishBtn({
  isPublished,
  updateItemPublishStatus,
  itemId,
}: ButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const handleConfirmation = async () => {
    setIsLoading(true)

    try {
      updateItemPublishStatus(itemId, isPublished)

      toast({
        title: `Tu item ha sido ${isPublished ? 'despublicado' : 'publicado'}`,
      })
    } catch (err) {
      toast({
        title: 'Hubo un error al publicar tu item',
        variant: 'destructive',
        description:
          'Por favor intenta de nuevo más tarde. Si el problema persiste, contacta a soporte.',
      })
    }

    setIsLoading(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{isPublished ? 'Despublicar' : 'Publicar'}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isPublished ? 'Despublicar' : 'Publicar'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isPublished ? (
              <span>
                ¿Estás seguro que deseas despublicar este item? Esto hará que
                deje de aparecer en la página de tu empresa.
              </span>
            ) : (
              <span>
                ¿Estás seguro que deseas publicar este item? Esto hará que
                aparezca en la página de tu empresa.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleConfirmation()}>
            {isLoading ? (
              <Loader2Icon className="mr-2 animate-spin" />
            ) : (
              <SendIcon className="mr-2" />
            )}
            <span>Continuar</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
