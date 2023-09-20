'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

import SocialMediaURLSelect from '@/components/social-media-url-select'
import { StatesSelector } from '@/components/states-selector'
import { Loader2Icon, User2Icon } from 'lucide-react'
import ImageUploadInput from '../image-upload-input'
import { useRouter } from 'next/navigation'
import MexFlagIcon from './mx-flag-icon'

const profileFormSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es requerido.',
    })
    .min(2, {
      message: 'El nombre debe ser por lo menos de dos caracteres.',
    })
    .max(40, {
      message: 'El nombre debe ser maximo de 40 caracteres.',
    }),
  email: z.string().email(),
  imageURL: z.string().optional(),
  imageData: z
    .any()
    .refine((value) => value instanceof File, {
      message: 'Invalid file format.',
    })
    .optional(),
  bio: z
    .string()
    .max(150, {
      message: 'La biografía debe ser maximo de 120 caracteres.',
    })
    .optional(),
  url: z.string().optional(),
  links: z
    .array(z.object({ url: z.string(), value: z.string(), id: z.string() }))
    .optional(),
  phone: z
    .string()
    .optional()
    .refine(
      (value) => {
        const phone = removeMaskFromPhone(value)

        return phone.length === 10
      },
      {
        message: 'El telefono debe ser de 10 digitos.',
      },
    ),
  location: z.string().optional(),
})

type FormData = z.infer<typeof profileFormSchema>

type DirtyField = {
  [key: string]: boolean
}

type DirtyFields = {
  dirtyFields: DirtyField
}

export interface ProfileFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  userProfile: {
    id: string
    name: string
    email: string
    image: string | null
    profile: {
      id: string
      bio: string | null
      location: string | null
      phone: string | null
      links: string | null
    }
  }
}

const cleanData = (data: any) => {
  // we dont need the url on the payload
  const { url, ...remainingData } = data

  // links needs to be an string
  if (remainingData.links) {
    remainingData.links = JSON.stringify(remainingData.links)
  }

  // phone needs to be a number without mask
  if (remainingData.phone) {
    remainingData.phone = remainingData.phone.replace(/\D/g, '')
  }

  return remainingData
}

const addMaskToPhone = (phone: string) => {
  if (!phone) return ''

  const phoneMask = phone
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1)-$2-$3') // Apply mask pattern

  return phoneMask
}

const removeMaskFromPhone = (phone: string | undefined) => {
  if (!phone) return ''

  return phone.replace(/\D/g, '')
}

export const ProfileForm = ({ userProfile }: ProfileFormProps) => {
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userProfile?.name || '',
      email: userProfile?.email || '',
      imageURL: userProfile?.image || '',
      bio: userProfile?.profile?.bio || '',
      url: '',
      links:
        (userProfile?.profile?.links &&
          JSON.parse(userProfile.profile?.links)) ||
        '',
      phone:
        (userProfile.profile?.phone &&
          addMaskToPhone(userProfile.profile.phone)) ||
        '',
      location: userProfile?.profile?.location || '',
    },
  })

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    const formData = new FormData()

    if (data.imageData) {
      formData.append('imageData', data.imageData)
      formData.append('imageName', data.imageData.name)
    }

    formData.append('userId', userProfile.id)

    // Only add the dirty fields to the formData
    const { dirtyFields }: any = form.formState // {password: true, email: true}
    const cleanedData = cleanData(data) // {password: "123", email: "email@example.com"}

    Object.keys(cleanedData).forEach((key) => {
      if (dirtyFields[key as keyof DirtyFields]) {
        formData.append(key, cleanedData[key as keyof typeof cleanedData])
      }
    })

    try {
      const result = await fetch('/api/profile', {
        method: 'POST',
        body: formData,
      })

      if (result.ok) {
        toast({
          title: 'Tu perfil se ha actualizado correctamente.',
        })

        router.refresh()
      } else {
        toast({
          title:
            'Hubo un error al guardar los datos. Por favor intenta de nuevo.',
          description: 'Si el problema persiste, contacta a soporte.',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title:
          'Hubo un error al guardar los datos. Por favor intenta de nuevo.',
        description: 'Si el problema persiste, contacta a soporte.',
        variant: 'destructive',
      })
    }

    setIsSaving(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ImageUploadInput form={form} Icon={User2Icon} />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nombre <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormDescription>Este es tu nombre público.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} disabled={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografía</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuenta algo sobre ti..."
                  className="resize-none"
                  {...field}
                  maxLength={160}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SocialMediaURLSelect
          form={form}
          inputName="links"
          labelText="Mis Links"
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefono</FormLabel>
              <FormControl>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    type="button"
                    className="flex w-[100px] gap-2"
                    tabIndex={-1}
                  >
                    <MexFlagIcon />
                    <span>+52</span>
                  </Button>

                  <Input
                    type="tel"
                    placeholder="(00) 0000-0000"
                    {...field}
                    maxLength={10}
                    onChange={(e) => {
                      field.onChange(addMaskToPhone(e.target.value))
                    }}
                  />
                </div>
              </FormControl>

              <FormDescription>
                No se mostrará en tu perfil, solo es para que las empresas
                puedan contactarte en caso de que apliques a sus servicios.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={() => (
            <FormItem>
              <FormLabel>Estado de residencia</FormLabel>
              <FormControl>
                <StatesSelector control={form.control} inputName="location" />
              </FormControl>
              <FormDescription>
                El estado de México donde actualmente vives.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full md:w-1/2 lg:w-1/3"
          disabled={!form.formState.isDirty || isSaving}
        >
          {isSaving ? (
            <>
              <Loader2Icon className="mr-2" /> Actualizando...
            </>
          ) : (
            'Actualizar perfil'
          )}
        </Button>
      </form>
    </Form>
  )
}
