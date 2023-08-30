import React from 'react'
import { MailIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import ResendVerifyEmailForm from '@/components/auth/resend-verify-email-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cuenta no verificada',
  description: 'Tu cuenta no esta verificada',
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
}

function EmailNotVerifiedPage() {
  return (
    <section className="h-screen flex flex-col items-center justify-center px-0 md:px-20">
      <div className=" p-8 animate-slide-down ">
        <h2 className="text-2xl lg:text-4xl font-bold mb-6  text-center">
          Tu cuenta no esta verificada
        </h2>

        <MailIcon className="w-14 h-14 mx-auto text-primary" />

        <p className="text-md md:text-lg text-center w-full md:w-1/2 mx-auto mt-4">
          Por favor revisa tu correo, para poder iniciar sesion es necesario
          verificar tu cuenta desde el correo con el que te registraste.
        </p>

        <Separator className="my-8 w-full md:w-1/2 mx-auto" />

        <ResendVerifyEmailForm />
      </div>
    </section>
  )
}

export default EmailNotVerifiedPage
