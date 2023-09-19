'use client'

import React from 'react'

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
import { Button } from '@/components/ui/button'
import { Loader2Icon, Trash2Icon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface DeleteCardProps {
  companyId: string
}

export default function DeleteCard({ companyId }: DeleteCardProps) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const router = useRouter()

  const handleDeleteConfirmClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setIsDeleteLoading(true)

    try {
      const response = await fetch(`/api/company/${companyId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
        router.push('/dashboard')
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
    setShowDeleteAlert(false)
    setIsDeleteLoading(false)
  }

  return (
    <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-1/2 lg:w-1/4">
          <Trash2Icon className="mr-2" />
          Eliminar
        </Button>
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(e) => handleDeleteConfirmClick(e)}>
            {isDeleteLoading ? (
              <Loader2Icon className="mr-2 animate-spin" />
            ) : (
              <Trash2Icon className="mr-2" />
            )}
            <span>Continue</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
