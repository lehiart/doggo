'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BreedSelector } from './breed-selector-input'
import ImageUploadInput from '../../image-upload-input'
import { toast } from '@/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PackMember } from '@prisma/client'
import { DogIcon } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(1).max(25),
  breed: z.string(),
  age: z.string(),
  size: z.string(),
  image: z.string().optional(),
  gender: z.string(),
  weight: z.string().optional(),
})

interface MemberFormProps {
  id: string | undefined
  type: 'EDIT' | 'NEW'
  member?: PackMember | undefined
}

export default function PackMemberForm({ id, type, member }: MemberFormProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: member?.name,
      breed: member?.breed,
      age: member?.age,
      gender: member?.gender,
      size: member?.size,
      weight: member?.weight || undefined,
      image: member?.imageURL || undefined,
    },
  })

  async function addNewMember(data: z.infer<typeof formSchema>) {
    const payload = {
      ...data,
      id,
    }

    try {
      const result = await fetch('/api/pack/member', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      if (result.ok) {
        router.refresh()
        router.push('/manada')
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

  const editMemberData = async (data: z.infer<typeof formSchema>) => {
    const payload = {
      ...data,
      id,
      memberId: member?.id,
    }

    try {
      const result = await fetch('/api/pack/member', {
        method: 'PUT',
        body: JSON.stringify(payload),
      })

      if (result.ok) {
        router.refresh()
        router.push('/manada')
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
    setIsSaving(true)

    if (type === 'EDIT') {
      await editMemberData(data)
    }

    if (type === 'NEW') {
      await addNewMember(data)
    }

    setIsSaving(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ImageUploadInput form={form} Icon={DogIcon} />

        <div className="grid grid-cols-2 items-end gap-4 mb-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre o apodo"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <BreedSelector form={form} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Edad <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Elige una edad..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-[200px]">
                    {Array.from({ length: 11 }, (_, i) => (
                      <SelectItem key={i + 'mes'} value={`0.${i + 1}`}>
                        {i + 1} {i + 1 === 1 ? 'mes' : 'meses'}
                      </SelectItem>
                    ))}

                    {Array.from({ length: 30 }, (_, i) => (
                      <SelectItem key={i + 'año'} value={`${i + 1}`}>
                        {i + 1} {i + 1 === 1 ? 'año' : 'años'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tamaño <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Elige un tamaño.." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="x-small">Extra Chico</SelectItem>
                    <SelectItem value="small">Chico</SelectItem>
                    <SelectItem value="medium">Mediano</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                    <SelectItem value="x-large">Extra Grande</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Genero <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Hembra</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Macho</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso (Opcional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Elige un peso..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-[200px]">
                    {Array.from({ length: 100 }, (_, i) => (
                      <SelectItem key={i + 'mes'} value={`${i + 1}`}>
                        {i + 1} kg
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={!form.formState.isValid || isSaving}
          className="w-full md:w-1/2 mt-12"
        >
          {type === 'EDIT' ? 'Editar' : 'Agregar'}
        </Button>
      </form>
    </Form>
  )
}
