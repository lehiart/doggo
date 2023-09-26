'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Status } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { DialogClose } from '@radix-ui/react-dialog'
import { Textarea } from '@/components/ui/textarea'

interface UpdateStateBtnsProps {
  id: string
}

const parseStatus = (status: Status) => {
  switch (status) {
    case Status.PENDING:
      return 'Pendiente'
    case Status.ACCEPTED:
      return 'Aceptado'
    case Status.REJECTED:
      return 'Rechazado'
    default:
      return 'un nuevo estado'
  }
}

export default function UpdateStateBtns({ id }: UpdateStateBtnsProps) {
  const router = useRouter()
  const [message, setMessage] = useState('')

  async function updateClientRequestStatus(requestId: string, status: Status) {
    const response = await fetch('/api/client-request/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requestId, status, message }),
    })

    if (response.ok) {
      toast({ title: `Estado actualizado a ${parseStatus(status)}` })

      router.refresh()
    }
  }

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-1/2 md:w-1/4" variant="destructive">
            Rechazar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Estas seguro de querer rechazar esta solicitud?
            </DialogTitle>
            <DialogDescription>
              No podras darle seguimiento a este posible cliente. Ayudanos a
              mejorar, dinos los motivos por que lo rechazas.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="message" className="text-left">
                Razon de rechazo
              </Label>
              <Textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col md:flex-row gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              onClick={() => updateClientRequestStatus(id, Status.REJECTED)}
              disabled={message.trim() === ''}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        onClick={() => updateClientRequestStatus(id, Status.ACCEPTED)}
        className="w-1/2 md:w-1/4"
      >
        Aceptar
      </Button>
    </div>
  )
}
