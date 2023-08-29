'use client'

import React, { useState } from 'react'
import { getSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { CheckCircleIcon, MailCheckIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Label } from '../ui/label'
import Link from 'next/link'

export default function ResendVerifyEmailForm() {
  const [isSaving, setIsSaving] = useState<boolean>(false)

  async function onSubmit(data: FormData) {
    const session = await getSession()
    setIsSaving(true)

    try {
      if (session) {
        return
      }

      await fetch('/api/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ email: data.get('email') }),
      })
    } catch (error) {
      toast({
        title:
          'Hubo un error al guardar los datos. Por favor intenta de nuevo.',
        description: 'Si el problema persiste, contacta a soporte.',
        variant: 'destructive',
      })
    }
  }
  return (
    <div className="w-full md:w-1/2 mx-auto">
      {isSaving ? (
        <p className="text-center flex flex-col gap-4 space-y-4">
          <CheckCircleIcon className="h-14 w-14 mt-4 mx-auto mb-4  text-primary" />
          Se ha enviado un correo a tu cuenta, por favor revisa tu bandeja de
          entrada. Si no encuentras el correo, revisa tu bandeja de spam.
          <Link href="/login">
            <Button className="w-full">Volver al inicio</Button>
          </Link>
        </p>
      ) : (
        <>
          <p className="text-md md:text-lg mt-6 text-center mb-8">
            Si no encuentras el correo, puedes solicitar uno nuevo introduciendo
            tu correo:
          </p>
          <form action={onSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                autoComplete="off"
                autoCapitalize="off"
                placeholder="Tu correo con el que te registraste..."
                required
              />
            </div>

            <Button disabled={isSaving} type="submit" className="w-full gap-4">
              Reenviar email <MailCheckIcon />
            </Button>
          </form>
        </>
      )}
    </div>
  )
}
