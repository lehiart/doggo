'use client'

import React from 'react'
import z from 'zod'

import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendRecoveryEmail } from './actions'
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'

const formDataSchema = z.object({
  email: z.string().email(),
})

type FormData = z.infer<typeof formDataSchema>

export default function ForgotPasswordPage() {
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
    <section className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900 dark:brightness-75">
          <Image
            src="/images/forgot-password.jpg"
            fill
            alt="aaaa"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="lg:p-8 pt-16 lg:pt-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Recupera tu contraseña
            </h1>
            <p className="text-sm text-muted-foreground">
              Introduce tu email para enviarte un correo con el cual podras
              recuperar tu contraseña
            </p>
          </div>

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
        </div>
      </div>
    </section>
  )
}
