'use client'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Label } from '@/components/ui/label'
import { Loader2Icon, StarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { toast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  rating: z
    .number({
      required_error: 'Debes dar una calificación',
    })
    .min(1)
    .max(5),
  comment: z
    .string({
      required_error: 'Debes escribir un comentario',
    })
    .min(2, {
      message: 'El comentario debe tener al menos 2 caracteres',
    })
    .max(100, {
      message: 'El comentario debe tener menos de 100 caracteres',
    }),
})

interface EditOpinionDialogProps {
  opinionId: string
  name: string
  comment: string
  rating: number
  closeDialog: () => void
}

export default function EditOpinionDialog({
  opinionId,
  name,
  comment,
  rating,
  closeDialog,
}: EditOpinionDialogProps) {
  const [hover, setHover] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating,
      comment,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    const response = await fetch('/api/opinions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        opinionId,
        rating: data.rating,
        comment: data.comment,
      }),
    })

    if (response.ok) {
      toast({
        title: 'Opinion editada',
        description: 'La opinion fue editada con exito',
      })

      router.refresh()
    } else {
      toast({
        title: 'Error',
        description: 'No se pudo editar la opinion',
      })
    }

    setIsLoading(false)
    closeDialog()
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Editar opinion de {name}</DialogTitle>
        <DialogDescription>
          Recuerda que las opiniones que das son públicas y pueden ser vistas
          por cualquier persona.
        </DialogDescription>
        <DialogDescription>No incluyas información personal.</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="rating">Calificacion</Label>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <ul className="my-1 flex list-none gap-1 p-0">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    field.onChange(value)
                  }}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(field.value)}
                >
                  <StarIcon
                    className="text-primary"
                    fill={
                      value <= (hover || field.value)
                        ? 'currentColor'
                        : 'transparent'
                    }
                  />
                </Button>
              ))}
            </ul>
          )}
        />

        <Label htmlFor="comment">Comentario</Label>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              className="mt-4"
              placeholder="Escribe un comentario..."
            />
          )}
        />

        {errors?.comment && (
          <p className="text-sm text-red-600 mt-2">{errors.comment.message}</p>
        )}

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Enviando
              </>
            ) : (
              'Enviar'
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
