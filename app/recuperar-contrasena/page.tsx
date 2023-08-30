import React from 'react'

import Image from 'next/image'
import { Metadata } from 'next'
import ForgotPasswordForm from '@/components/auth/forgot-password-form'

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
  description: 'Recupera tu contraseña',
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
}

export default function ForgotPasswordPage() {
  return (
    <section className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900 dark:brightness-75">
          <Image
            src="/images/forgot-password.jpg"
            fill
            alt="Un perro sentado frente a una computadora"
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

          <ForgotPasswordForm />
        </div>
      </div>
    </section>
  )
}
