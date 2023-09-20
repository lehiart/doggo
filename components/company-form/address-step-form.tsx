'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { StatesSelector } from '../states-selector'
import { useFormState } from './company-form-context'
import { Button } from '../ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const formSchema = z.object({
  streetAddress: z
    .string()
    .min(1, {
      message: 'La calle es requerida',
    })
    .max(35, {
      message: 'La calle debe ser maximo de 35 caracteres',
    }),
  streetNumber: z
    .string()
    .min(1, {
      message: 'El numero exterior es requerido',
    })
    .max(10, {
      message: 'El numero exterior debe ser maximo de 10 caracteres',
    }),
  streetAddress2: z.string().optional(),
  locality: z
    .string()
    .min(1, {
      message: 'La colonia es requerida',
    })
    .max(35, {
      message: 'La colonia debe ser maximo de 35 caracteres',
    }),
  city: z
    .string()
    .min(1, {
      message: 'La ciudad es requerida',
    })
    .max(35, {
      message: 'La ciudad debe ser maximo de 35 caracteres',
    }),
  state: z.string({
    required_error: 'El estado es requerido',
  }),
  zip: z
    .string()
    .length(5, {
      message: 'El codigo postal debe ser de 5 caracteres',
    })
    .regex(/^\d+$/),
})

export default function AddressStepForm() {
  const { onHandleNext, onHandleBack, setFormData, formData, company, type } =
    useFormState()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      streetAddress: formData?.streetAddress || company?.streetAddress || '',
      streetNumber: formData?.streetNumber || company?.streetNumber || '',
      streetAddress2: formData?.streetAddress2 || company?.streetAddress2 || '',
      locality: formData?.locality || company?.locality || '',
      city: formData?.city || company?.city || '',
      state: formData?.state || company?.state || '',
      zip: formData?.zip || company?.zip || '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setFormData((prev: any) => ({ ...prev, ...data }))
    onHandleNext()
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Dirección</CardTitle>
        <CardDescription className="max-w-lg">
          {type === 'EDIT' ? 'Actualiza' : 'Agrega'} la dirección de tu empresa.
          Asegúrate de proporcionar una dirección precisa y completa para
          garantizar que los clientes puedan ubicarte con facilidad
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* STREET */}

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Calle</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* STREET & EXT NUMBER */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ">
              <FormField
                control={form.control}
                name="streetNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero exterior</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="streetAddress2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero interior</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* LOCALITY */}

            <FormField
              control={form.control}
              name="locality"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Colonia</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CITY */}

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Alcaldia/Municipio/Ciudad</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* STATE */}

            <StatesSelector
              control={form.control}
              inputName="state"
              className="w-full"
            />

            {/* ZIP */}

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Codigo Postal</FormLabel>
                  <FormControl>
                    <Input type="text" maxLength={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  NEXT &  PREV BUTTONS */}

            <div className="flex gap-2 w-full justify-between items-center">
              <Button
                type="button"
                onClick={onHandleBack}
                className="w-[115px]"
              >
                <ChevronLeftIcon className="w-4 h-4 mr-1" />
                Atras
              </Button>
              <Button type="submit">
                Siguiente
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
