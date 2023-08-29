'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { XCircleIcon, Loader2Icon, CheckCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

enum ActivationStatus {
  INVALID = 'INVALID',
  EXPIRED = 'EXPIRED',
  SUCCESS = 'SUCCESS',
  LOADING = 'LOADING',
}

const MessageCard = ({ status }: { status: ActivationStatus }) => {
  if (status === ActivationStatus.LOADING) {
    return (
      <div className="p-8 animate-slide-down ">
        <h2 className="text-2xl lg:text-4xl font-bold mb-12 text-center">
          Verificando email...
        </h2>

        <div className="flex flex-col justify-center items-center space-y-6">
          <Loader2Icon className="h-16 w-16 text-primary animate-spin" />
          <p className="text-lg text-center w-full mx-auto mt-4">
            Estamos verificando tu email, por favor espera un momento.
          </p>
        </div>
      </div>
    )
  }

  if (status === ActivationStatus.INVALID) {
    return (
      <div className="p-8 animate-slide-down ">
        <h2 className="text-2xl lg:text-4xl font-bold mb-12 text-center">
          Token invalido
        </h2>

        <div className="flex flex-col justify-center items-center space-y-6">
          <XCircleIcon className="h-16 w-16 text-primary" />
          <p className="text-lg text-center w-full mx-auto mt-4">
            El token de activacion es invalido o ya ha sido utilizado.
          </p>

          <Link href="/">
            <Button>Ir a la pagina principal</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (status === ActivationStatus.EXPIRED) {
    return (
      <div className="p-8 animate-slide-down ">
        <h2 className="text-2xl lg:text-4xl font-bold mb-12 text-center">
          Token expirado
        </h2>

        <div className="flex flex-col justify-center items-center space-y-6">
          <XCircleIcon className="h-16 w-16 text-primary" />
          <p className="text-lg text-center w-full mx-auto mt-4">
            El token de activacion ha expirado o ya ha sido utilizado.
          </p>

          <Link href="/">
            <Button>Ir a la pagina principal</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 animate-slide-down ">
      <h2 className="text-2xl lg:text-4xl font-bold mb-12 text-center">
        Email verificado
      </h2>

      <div className="flex flex-col justify-center items-center space-y-6">
        <CheckCircleIcon className="h-16 w-16 text-primary" />
        <p className="text-lg text-center w-full mx-auto mt-4">
          El email ha sido verificado correctamente.
        </p>

        <Link href="/">
          <Button>Ir a la pagina principal</Button>
        </Link>
      </div>
    </div>
  )
}

const ActivateTokenPage = ({ params }: { params: { token: string } }) => {
  const [activationStatus, setActivationStatus] = useState<ActivationStatus>(
    ActivationStatus.LOADING,
  )

  const { token } = params
  const handleTokenActivation = async (token: string) => {
    if (!token) {
      setActivationStatus(ActivationStatus.INVALID)
      return
    }

    try {
      const result = await fetch('/api/auth/activate', {
        method: 'POST',
        body: JSON.stringify({ token }),
      })

      if (result.status === 403) {
        setActivationStatus(ActivationStatus.INVALID)
        return
      }

      if (result.status === 401) {
        setActivationStatus(ActivationStatus.EXPIRED)
        return
      }

      signOut({ redirect: false })
      setActivationStatus(ActivationStatus.SUCCESS)
    } catch (error) {
      setActivationStatus(ActivationStatus.INVALID)
    }
  }

  useEffect(() => {
    handleTokenActivation(token)
  }, [token])

  return (
    <section className="h-screen flex justify-center items-center">
      <MessageCard status={activationStatus} />
    </section>
  )
}

export default ActivateTokenPage
