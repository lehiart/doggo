'use client'

import { ChevronRightIcon, ImageIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import ImageUploadInput from '../image-upload-input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '../ui/button'
import { Input } from '@/components/ui/input'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Category } from '@prisma/client'
import { useFormState } from '@/components/company-form/company-form-context'
import { CategoriesMultiSelect } from './categories-multi-select'
import checkSlugIsUnique from '@/app/nuevo/actions'
import { useEffect } from 'react'
import { slugify } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

const formSchema = z.object({
  imageURL: z.string().optional(),
  imageData: z
    .any()
    .refine((value) => value instanceof File, {
      message: 'Invalid file format.',
    })
    .optional(),
  name: z
    .string()
    .min(1, {
      message: 'El nombre de tu negocio es requerido',
    })
    .max(25, {
      message: 'El nombre de tu negocio debe ser maximo de 25 caracteres',
    }),
  slug: z
    .string()
    .min(1, {
      message: 'El URL de tu negocio es requerido',
    })
    .max(35, {
      message: 'El URL de tu negocio debe ser maximo de 35 caracteres',
    }),
  description: z
    .string()
    .min(1, {
      message: 'La descripcion de tu negocio es requerida',
    })
    .max(300, {
      message: 'La descripcion de tu negocio debe ser maximo de 300 caracteres',
    }),
  categories: z.array(z.string()).min(1, {
    message: 'Selecciona al menos una categoria',
  }),
})

export default function DetailsStepForm() {
  const { onHandleNext, setFormData, formData, company, type } = useFormState()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageURL: formData?.imageURL || company?.imageURL || undefined,
      name: formData?.name || company?.name || '',
      slug: formData?.slug || company?.slug || '',
      description: formData?.description || company?.description || '',
      categories:
        formData?.categories ||
        company?.categories.map((c: Category) => c.id) ||
        [],
    },
  })

  const watchNameinput = form.watch('name')

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setFormData((prev: any) => ({ ...prev, ...data }))

    // check if slug is unique, only if slug has changed
    if (company?.slug !== data.slug) {
      const slugIsUnique = await checkSlugIsUnique(data.slug)

      if (!slugIsUnique) {
        form.setError('slug', {
          type: 'manual',
          message: 'Slug is already taken',
        })
        return
      }
    }

    onHandleNext()
  }

  useEffect(() => {
    const slugValue = slugify(watchNameinput)

    form.setValue('slug', slugValue, {
      shouldValidate: true,
    })
  }, [watchNameinput, form])

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Detalles</CardTitle>
        <CardDescription className="max-w-lg">
          {type === 'EDIT' ? 'Actualiza' : 'Agrega'} la información clave de tu
          empresa, como la descripción, la categoria y otros detalles
          importantes para mantener tu perfil actualizado y relevante para
          clientes.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ImageUploadInput form={form} Icon={ImageIcon} />
            <FormDescription className="text-center max-w-sm my-0 mx-auto">
              Esta imagen será visible en tu perfil público. Puede ser un
              logotipo o una fotografía de tu empresa.
            </FormDescription>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mi-nuevo-negocio"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Esta será la URL de tu negocio en público, debe ser única y
                    solo puede contener letras, números y guiones.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe una breve descripción de tu negocio aquí..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CategoriesMultiSelect control={form.control} />

            <div className="flex justify-end items-center">
              <Button type="submit">
                Siguiente
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
