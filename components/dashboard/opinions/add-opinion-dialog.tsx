'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(2).max(50),
})

interface AddOpinionDialogProps {
  itemId: string
  name: string
  companyId: string
  userId: string
}

export default function AddOpinionDialog({
  itemId,
  name,
  companyId,
  userId,
}: AddOpinionDialogProps) {
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const [hover, setHover] = useState(0)
  const [open, setOpen] = useState(false)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/opinions', {
        method: 'POST',
        body: JSON.stringify({
          rating: data.rating,
          comment: data.comment,
          name,
          itemId,
          companyId,
          userId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Ocurrio un error al enviar tu opinion',
        })
      } else {
        toast({
          title: 'Listo',
          description: 'Tu opinion fue enviada con exito',
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Ocurrio un error al enviar tu opinion',
      })
    }

    reset()
    setOpen(false)
    setHover(0)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Agregar opinion a {name}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Opnion del item {name}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when yo done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="rating">Rating:</Label>
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

          <Label htmlFor="comment">Comentario:</Label>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Comment"
                autoComplete="off"
                className="mt-4"
              />
            )}
          />

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>

            <Button type="submit" disabled={!isValid}>
              Enviar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
