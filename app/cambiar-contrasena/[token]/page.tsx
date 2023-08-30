import React from 'react'
import { Metadata } from 'next'
import ChangePasswordForm from '@/components/auth/change-password-form'

export const metadata: Metadata = {
  title: 'Cambiar contraseña',
  description: 'Cambia tu contraseña',
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
}

interface ChangePasswordPageProps {
  params: { token: string }
}

export default function ChangePasswordPage({
  params,
}: ChangePasswordPageProps) {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Cambia tu contraseña
            </h1>
            <p className="text-sm text-muted-foreground">
              Introduce tu nueva contraseña.
            </p>
          </div>

          <ChangePasswordForm token={params.token} />
        </div>
      </div>
    </div>
  )
}
