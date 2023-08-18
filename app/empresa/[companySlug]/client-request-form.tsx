'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Item } from '@prisma/client'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { toast } from '@/components/ui/use-toast'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  message: z.string().min(2).max(50),
  selectedItems: z.array(z.string()).optional(),
})

interface ClientRequestFormProps {
  userId: string
  companyId: string
  phone: string | null
  email: string | null
  items: Item[]
}

export default function ClientRequestForm({
  userId,
  companyId,
  phone,
  email,
  items,
}: ClientRequestFormProps) {
  const [isSubmmited, setIsSubmmited] = React.useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      selectedItems: [],
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmmited(true)

    const fullItems = data.selectedItems?.map((item) => {
      const found = items?.find((i) => i.id === item)
      return { title: found?.title, id: found?.id }
    })

    const cleanedItems =
      fullItems && fullItems.length > 0 ? JSON.stringify(fullItems) : undefined

    const response = await fetch('/api/client-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        companyId,
        message: data.message,
        selectedItems: cleanedItems,
      }),
    })

    if (response.ok) {
      toast({ title: 'Solicitud enviada con éxito' })
    }
  }

  return (
    <Collapsible className="rounded-lg border p-4">
      <CollapsibleTrigger>Ver datos de contacto</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col items-center space-y-4">
          Esta es la info de contacto:
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="selectedItems"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Servicios</FormLabel>
                    <FormDescription>
                      Select the items you want to display in the sidebar.
                    </FormDescription>
                  </div>
                  {items.map((item: Item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="selectedItems"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange(
                                        field.value
                                          ? [...field.value, item.id]
                                          : [],
                                      )
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== item.id,
                                        ),
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.title}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Mensaje</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmmited}>
              Submit
            </Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  )
}
