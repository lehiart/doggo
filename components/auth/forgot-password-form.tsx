'use client'

import React from 'react'
import z from 'zod'

import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/use-toast'
import { Metadata } from 'next'
import { sendRecoveryEmail } from '@/app/recuperar-contrasena/actions'

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
  description: 'Recupera tu contraseña',
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
}

const formDataSchema = z.object({
  email: z.string().email(),
})

type FormData = z.infer<typeof formDataSchema>

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    shouldUseNativeValidation: true,
    resolver: zodResolver(formDataSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await sendRecoveryEmail(data)
        reset()
        toast({
          title:
            'Se ha enviado un correo con las instrucciones para recuperar tu contraseña.',
          description: 'Revisa tu bandeja de entrada y de spam.',
        })
      })}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="email"
            className="text-sm font-medium text-muted-foreground"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
            {...register('email')}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </div>
    </form>
  )
}
