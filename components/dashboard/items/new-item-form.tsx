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
import { redirect, useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  category: z.array(z.string()).min(1).max(1),
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
      // redirect('/dashboard/items')
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
                <Input placeholder="shadcn" {...field} />
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
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <CategoriesMultiSelect control={form.control} inputName="category" />

        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
