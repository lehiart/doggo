'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Status } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface UpdateStateBtnsProps {
  id: string
}

export default function UpdateStateBtns({ id }: UpdateStateBtnsProps) {
  const router = useRouter()

  async function updateClientRequestStatus(requestId: string, status: Status) {
    const response = await fetch('/api/client-request/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requestId, status }),
    })

    if (response.ok) {
      toast({ title: `Estado actualizado a ${status}` })
      router.refresh()
    }
  }

  return (
    <div className="flex gap-2 mt-4">
      <Button onClick={() => updateClientRequestStatus(id, Status.ACCEPTED)}>
        Aceptar
      </Button>
      <Button onClick={() => updateClientRequestStatus(id, Status.REJECTED)}>
        Rechazar
      </Button>
    </div>
  )
}
