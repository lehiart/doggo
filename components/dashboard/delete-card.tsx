'use client'

import React, { use } from 'react'

import {
  AlertDialog,
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
import { useDashboardContext } from './dashboard-context'

interface DeleteCardProps {
  companyId: string
  companyName: string
}

export default function DeleteCard({
  companyId,
  companyName,
}: DeleteCardProps) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const { setSelectedCompany } = useDashboardContext()

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
        setSelectedCompany(null)
        router.refresh()
        router.push('/dashboard')

        toast({
          title: 'Tu negocio ha sido eliminado',
          description: `Tu negocio ${companyName} ha sido eliminado.`,
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
    setShowDeleteAlert(false)
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
          <AlertDialogTitle>
            Estas seguro de eliminar {companyName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente tu
            negocio y removerá sus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel disabled={isDeleteLoading}>
            Cancelar
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={(e) => handleDeleteConfirmClick(e)}
            disabled={isDeleteLoading}
          >
            {isDeleteLoading ? (
              <Loader2Icon className="mr-2 animate-spin" />
            ) : (
              <Trash2Icon className="mr-2" />
            )}
            <span>Eliminar</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
