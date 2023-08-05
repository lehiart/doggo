import {
  Form,
  FormControl,
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
import { ChevronLeft, Loader2Icon } from 'lucide-react'
import SocialMediaURLSelect from '../social-media-url-select'
import { toast } from '../ui/use-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  phone: z.string(),
  email: z.string().email(),
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
      phone: company?.phone || formData?.phone,
      email: company?.email || formData?.email,
      website: company?.website || formData?.website,
      socialMediaLinks:
        (company?.socialMediaLinks && JSON.parse(company.socialMediaLinks)) ||
        (formData?.socialMediaLink && JSON.parse(formData?.socialMediaLinks)) ||
        '',
    },
  })

  const editCompanyData = async (data: z.infer<typeof formSchema>) => {
    setFormData((prev: any) => ({ ...prev, ...data }))

    const payload = {
      ...data, // merge with data captured from this step, so we dont wait for the setFormData
      ...formData,
      companyId: company?.id,
      id,
    }

    // socialMediaLinks needs to be an string
    if (payload.socialMediaLinks) {
      payload.socialMediaLinks = JSON.stringify(payload.socialMediaLinks)
    }

    try {
      const result = await fetch('/api/company', {
        method: 'PUT',
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

  async function AddNewCompany(data: z.infer<typeof formSchema>) {
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
      await AddNewCompany(data)
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Telefono <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input autoComplete="off" maxLength={10} {...field} />
              </FormControl>
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
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Sitio web <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SocialMediaURLSelect form={form} inputName="socialMediaLinks" />

        <div className="flex gap-2 w-full justify-between">
          <Button type="button" onClick={onHandleBack}>
            <ChevronLeft className="mr-2" />
            Atras
          </Button>
          <Button type="submit" disabled={isLoading || !form.formState.isValid}>
            {isLoading && <Loader2Icon className="mr-2 animate-spin" />}{' '}
            Completar
          </Button>
        </div>
      </form>
    </Form>
  )
}
