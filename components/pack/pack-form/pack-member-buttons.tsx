'use client'

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
import { toast } from '@/components/ui/use-toast'
import { Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

const showErrorToast = () => {
  toast({
    title: 'Error eliminando miembro',
    description: 'Hubo un error eliminando el miembro de tu manada',
    variant: 'destructive',
  })
}

export function PackMemberButtons({ memberId }: { memberId: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteConfirmation = async (memberId: string) => {
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/pack/member/${memberId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Eliminado',
          description: 'Se eliminó el miembro de tu manada',
        })

        router.refresh()
      } else {
        showErrorToast()
      }
    } catch (error) {
      showErrorToast()
    }

    setIsDeleting(false)
  }

  return (
    <>
      {/* EDIT BTN  */}
      {isDeleting ? (
        <Button variant="secondary" className="w-full" disabled={isDeleting}>
          Eliminando...
        </Button>
      ) : (
        <Link href={`/manada/editar/${memberId}`} className="w-full">
          <Button variant="secondary" className="w-full" disabled={isDeleting}>
            Editar
          </Button>
        </Link>
      )}

      {/* DELETE BTN */}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-destructive" disabled={isDeleting}>
            <Trash2Icon />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Estas seguro de querer eliminarlo?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Esta acción no se puede deshacer, el miembro de tu manada será
              borrado para siempre.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteConfirmation(memberId)}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
