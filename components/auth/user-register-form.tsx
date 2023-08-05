'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { userRegisterSchema } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { GoogleIcon } from '@/components/ui/google-icon'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type FormData = z.infer<typeof userRegisterSchema>

export function UserRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isSocialLoading, setIsSocialLoading] = React.useState<boolean>(false)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [roleType, setRoleType] = React.useState<string>('USER')

  function handlePasswordIconClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setShowPassword((prev) => !prev)
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const registrationResult = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
        role: roleType,
      }),
    })

    setIsLoading(false)

    if (!registrationResult?.ok) {
      return toast({
        title: 'Oh no! Algo salió mal.',
        description:
          'Tu registro falló. Por favor, inténtalo de nuevo. Si el problema persiste, contactenos.',
        variant: 'destructive',
      })
    } else {
      reset()
      return toast({
        title: 'Revise su correo electrónico ',
        description:
          'Hemos enviado un enlace para confirmar su correo electrónico. Asegúrese de revisar su bandeja de correo no deseado.',
      })
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="user">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="user" onClick={() => setRoleType('USER')}>
              Usuario
            </TabsTrigger>
            <TabsTrigger value="company" onClick={() => setRoleType('COMPANY')}>
              Negocio
            </TabsTrigger>
          </TabsList>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Nombre
              </Label>

              <Input
                id="name"
                placeholder="Nombre de usuario"
                type="text"
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect="off"
                disabled={isLoading || isSocialLoading}
                {...register('name')}
              />

              {errors?.name && (
                <p className="px-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                placeholder="nombre@correo.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading || isSocialLoading}
                {...register('email')}
              />

              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-2 grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Contraseña
              </Label>

              <div className="flex-column flex gap-1">
                <Input
                  id="password"
                  placeholder="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isLoading || isSocialLoading}
                  {...register('password')}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => handlePasswordIconClick(e)}
                  tabIndex={-1}
                  disabled={isLoading || isSocialLoading}
                >
                  <span className="sr-only">Ver contraseña</span>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
              </div>

              {errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <TabsContent value="user">
              <Button disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Registrarse
              </Button>
            </TabsContent>
            <TabsContent value="company">
              <Button disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Registrarse como negocio
              </Button>
            </TabsContent>
          </div>
        </Tabs>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continuar con
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setIsSocialLoading(true)
          signIn('google')
        }}
        disabled={isLoading || isSocialLoading}
      >
        {isSocialLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="h-4" />
        )}
        Google
      </Button>
    </div>
  )
}
