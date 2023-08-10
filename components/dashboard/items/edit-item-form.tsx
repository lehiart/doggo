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
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Item } from '@prisma/client'

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  category: z.array(z.string()).min(1).max(1),
})

interface EditItemFormProps {
  item: Item
  userId: string
}

export default function EditItemForm({ item, userId }: EditItemFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: item.title || '',
      description: item.description || '',
      category: [item.categoryId] || [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const payload = {
      ...values,
      itemId: item.id,
      userId,
    }

    const response = await fetch('/api/items', {
      method: 'PUT',
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

        <Button type="submit" disabled={isLoading}>
          Actualizar
        </Button>
      </form>
    </Form>
  )
}
