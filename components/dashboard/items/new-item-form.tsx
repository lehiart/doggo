'use client'

import React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { CategoriesMultiSelect } from '@/components/company-form/categories-multi-select'
import { useDashboardContext } from '../dashboard-context'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { StatesSelector } from '@/components/states-selector'
import { Switch } from '@/components/ui/switch'

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  category: z.array(z.string()).min(1).max(1),
  state: z.string().length(3),
  onlineBusiness: z.boolean(),
})

interface NewItemFormProps {
  userId: string
}

export default function NewItemForm({ userId }: NewItemFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { selectedCompany } = useDashboardContext()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: [],
      state: '',
      onlineBusiness: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    if (!selectedCompany) return

    const payload = {
      ...values,
      userId,
      companyId: selectedCompany.id,
    }

    const response = await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      router.push('/dashboard/items')
      return
    } else {
      toast({
        title: 'oh no, algo salio mal',
        description:
          'Por favor intenta de nuevo, si el problema persiste contacta a soporte',
        variant: 'destructive',
      })
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input placeholder="titulo" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
                <Input placeholder="descripcion" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <CategoriesMultiSelect control={form.control} inputName="category" />

        {/* if there is no state. we need to make this required, so its either online or state + online */}
        <FormField
          control={form.control}
          name="onlineBusiness"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Este servicio es en linea?
                </FormLabel>
                <FormDescription>
                  Receive emails about new products, features, and more.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <StatesSelector control={form.control} inputName="state" />
        {/* TODO: add message that is required */}

        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
