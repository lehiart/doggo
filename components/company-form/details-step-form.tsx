'use client'

import { ImageIcon, TerminalIcon } from 'lucide-react'
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

const formSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(1).max(25),
  slug: z.string().min(1).max(35, {
    message: 'El URL de tu negocio debe ser maximo de 35 caracteres',
  }),
  description: z.string().min(1).max(300),
  categories: z.array(z.string()).min(1),
})

export default function DetailsStepForm() {
  const { onHandleNext, setFormData, formData, company } = useFormState()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: company?.image || formData?.image,
      name: company?.name || formData?.name || '',
      slug: company?.slug || formData?.slug || '',
      description: company?.description || formData?.description,
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

    form.setValue('slug', slugValue)
  }, [watchNameinput, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ImageUploadInput form={form} Icon={ImageIcon} />
        <FormDescription className="text-center max-w-sm my-0 mx-auto">
          Esta imagen sera la que se mostrara en tu perfil publico. Puede ser un
          logo o una foto de tu negocio.
        </FormDescription>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nombre <span className="text-red-500">*</span>
              </FormLabel>
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
              <FormLabel>
                URL <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="URL" autoComplete="off" {...field} />
              </FormControl>
              <FormDescription>
                Este sera tu URL de tu negocio publico, debe ser unico y solo
                puede contener letras, numeros y guiones.
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
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CategoriesMultiSelect control={form.control} />

        <Button type="submit" disabled={!form.formState.isValid}>
          siguiente
        </Button>
      </form>
    </Form>
  )
}
