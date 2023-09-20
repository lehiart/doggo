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
import { useFormState } from '@/components/company-form/company-form-context'
import { CheckCircle2Icon, ChevronLeftIcon, Loader2Icon } from 'lucide-react'
import SocialMediaURLSelect from '../social-media-url-select'
import { toast } from '../ui/use-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import MexFlagIcon from '../profile/mx-flag-icon'
import { Category } from '@prisma/client'

const formSchema = z.object({
  phone: z.string().length(10, {
    message: 'El telefono debe ser de 10 digitos.',
  }),
  email: z.string().email({
    message: 'Ingresa un email valido.',
  }),
  website: z.string().optional(),
  socialMediaLinks: z
    .array(z.object({ url: z.string(), value: z.string(), id: z.string() }))
    .optional(),
})

export default function ContactStepForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { onHandleBack, setFormData, formData, id, type, company } =
    useFormState()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: formData?.phone || company?.phone || '',
      email: formData?.email || company?.email || '',
      website: formData?.website || company?.website || undefined,
      socialMediaLinks:
        (formData?.socialMediaLink && JSON.parse(formData?.socialMediaLinks)) ||
        (company?.socialMediaLinks && JSON.parse(company.socialMediaLinks)) ||
        undefined,
    },
  })

  const editCompanyData = async (data: z.infer<typeof formSchema>) => {
    setFormData((prev: any) => ({ ...prev, ...data }))

    const payload = {
      ...data, // merge with data captured from this step, so we dont wait for the setFormData
      ...formData,
      companyId: company?.id,
      userId: id,
    }

    // socialMediaLinks needs to be an string
    if (payload.socialMediaLinks) {
      payload.socialMediaLinks = JSON.stringify(payload.socialMediaLinks)
    }

    // categories needs to be an array of ids
    if (payload?.categories?.length > 0) {
      payload.categories = JSON.stringify(payload.categories)
    }

    // create formdata to send to the backend
    const payloadFormData = new FormData()

    Object.keys(payload).forEach((key) => {
      // remove undefined values
      if (payload[key] === undefined) return

      payloadFormData.append(key, payload[key])
    })

    if (payload.imageData) {
      payloadFormData.append('imageData', payload.imageData)
      payloadFormData.append('imageName', payload.imageData.name)
    }

    try {
      const result = await fetch(`/api/company`, {
        method: 'PUT',
        body: payloadFormData,
      })

      if (result.ok) {
        toast({
          title: 'Datos guardados',
          description: 'Los datos se guardaron correctamente.',
        })

        router.refresh()
        router.push('/dashboard/ajustes')
      } else {
        toast({
          title:
            'Hubo un error al guardar los datos. Por favor intenta de nuevo.',
          description: 'Si el problema persiste, contacta a soporte.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title:
          'Hubo un error al guardar los datos. Por favor intenta de nuevo.',
        description: 'Si el problema persiste, contacta a soporte.',
        variant: 'destructive',
      })
    }
  }

  async function addNewCompany(data: z.infer<typeof formSchema>) {
    setFormData((prev: any) => ({ ...prev, ...data }))

    const payload = {
      ...formData,
      ...data,
      id,
    }

    // socialMediaLinks needs to be an string
    if (payload.socialMediaLinks) {
      payload.socialMediaLinks = JSON.stringify(payload.socialMediaLinks)
    }

    try {
      const result = await fetch('/api/company', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      if (result.ok) {
        router.refresh()
        router.push('/dashboard')
      }
    } catch (error) {
      toast({
        title:
          'Hubo un error al guardar los datos. Por favor intenta de nuevo.',
        description: 'Si el problema persiste, contacta a soporte.',
        variant: 'destructive',
      })
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    if (type === 'EDIT') {
      await editCompanyData(data)
    }

    if (type === 'NEW') {
      await addNewCompany(data)
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="mb-2">Contacto</CardTitle>
        <CardDescription className="max-w-lg">
          {type === 'EDIT' ? 'Actualiza' : 'Agrega'} la información de contacto
          de tu empresa.
          <br />
          Mantener esta información actualizada garantiza una comunicación
          efectiva y una conexión sólida con tu audiencia.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        autoComplete="off"
                        autoCorrect="off"
                        maxLength={10}
                        type="tel"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="max-w-lg">
                    Este telefono será visible para tus clientes, aqui recibiras
                    solicitudes, por lo que te lo recomendamos sea un telefono
                    de tu empresa.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoCorrect="off"
                      type="email"
                      {...field}
                      placeholder="Email de tu empresa..."
                    />
                  </FormControl>
                  <FormDescription className="max-w-lg">
                    Este email será visible para tus clientes, aqui recibiras
                    solicitudes, por lo que te lo recomendamos sea un email de
                    tu empresa.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sitio web</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      autoComplete="off"
                      autoCorrect="off"
                      {...field}
                      placeholder="URL de tu sitio principal..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SocialMediaURLSelect
              form={form}
              inputName="socialMediaLinks"
              labelText="Links"
            />

            <div className="flex gap-2 w-full justify-between items-center">
              <Button
                type="button"
                onClick={onHandleBack}
                className="w-[115px]"
              >
                <ChevronLeftIcon className="w-4 h-4 mr-1" />
                Atras
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2Icon className="mr-2 animate-spin" /> Enviando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Completar
                    <CheckCircle2Icon className="ml-2 w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
