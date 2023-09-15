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
import { DogIcon, InfoIcon, Loader2Icon } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre no puede ir vacio' })
    .max(25, { message: 'El nombre no puede ser mayor a 25 letras' }),
  breed: z.string({
    required_error: 'Debes seleccionar una raza',
  }),
  age: z.string({
    required_error: 'Debes seleccionar una edad',
  }),
  size: z.string({
    required_error: 'Debes seleccionar un tamaño',
  }),
  imageURL: z.string().optional(),
  imageData: z
    .any()
    .refine((value) => value instanceof File, {
      message: 'Invalid file format.',
    })
    .optional(),
  gender: z.string({
    required_error: 'Debes seleccionar un genero',
  }),
  weight: z.string().optional(),
})

interface MemberFormProps {
  userId: string
  type: 'EDIT' | 'NEW'
  member?: PackMember | undefined
}

export default function PackMemberForm({
  userId,
  type,
  member,
}: MemberFormProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: member?.name || '',
      breed: member?.breed,
      age: member?.age,
      gender: member?.gender,
      size: member?.size,
      weight: member?.weight || undefined,
      imageURL: member?.imageURL || undefined,
    },
  })

  async function addNewMember(data: z.infer<typeof formSchema>) {
    const formData = new FormData()
    if (data.imageData) {
      formData.append('imageData', data.imageData)
      formData.append('imageName', data.imageData.name)
    }

    formData.append('userId', userId)
    formData.append('name', data.name)
    formData.append('breed', data.breed)
    formData.append('age', data.age)
    formData.append('gender', data.gender)
    formData.append('size', data.size)

    if (data.weight) {
      formData.append('weight', data.weight)
    }

    try {
      const result = await fetch('/api/pack/member', {
        method: 'POST',
        body: formData,
      })

      if (result.ok) {
        toast({
          title: 'Miembro agregado',
          description: 'Tu manada ha crecido!',
        })

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
      userId,
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

        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 mb-4 lg:mb-8 items-baseline">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 lg:mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:mb-8">
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
          disabled={isSaving}
          className="w-full  lg:w-1/2 mt-8 lg:mt-14 flex justify-center mx-auto "
        >
          {isSaving && <Loader2Icon className="h-5 w-5 animate-spin mr-2" />}
          {type === 'EDIT' ? 'Editar' : 'Agregar'}
        </Button>
      </form>
      <HoverCard>
        <HoverCardTrigger className="flex justify-center items-center mx-auto mt-6 gap-2 hover:underline">
          <InfoIcon className="h-4 w-4" />
          <span className="text-sm">Por que pedimos esta información?</span>
        </HoverCardTrigger>
        <HoverCardContent className="text-center text-sm">
          Esta información nos ayuda a ofrecerte servicios mas personalizados
          para tu mascota.
        </HoverCardContent>
      </HoverCard>
    </Form>
  )
}
