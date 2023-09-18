'use client'

import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { toast } from '@/components/ui/use-toast'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getImagesData } from '@/lib/validations/image'
import Image from 'next/image'
import { CameraIcon, LucideIcon } from 'lucide-react'
import { FormControl, FormField, FormItem } from '@/components/ui/form'

export const ImageUploadInput = ({
  form,
  Icon,
}: {
  form: any
  Icon: LucideIcon
}) => {
  const profileInputFileRef = useRef<HTMLInputElement>(null)

  const editImage = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    const imagesData = getImagesData(files)

    if (!imagesData) {
      toast({ title: 'Por favor, elige una imagen válida.' })
      return
    }

    const { imagesPreviewData, selectedImagesData } = imagesData

    const newImage = imagesPreviewData[0].src

    form.setValue('imageURL', newImage, { shouldDirty: true })
    form.setValue('imageData', selectedImagesData[0])
  }

  return (
    <div className="relative mx-auto my-16 flex w-32 justify-center md:w-[200px]">
      <FormField
        control={form.control}
        name="imageURL"
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <>
                  <input
                    className="hidden"
                    name="image"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    ref={profileInputFileRef}
                    onChange={editImage}
                  />

                  <div className="group aspect-square w-32 overflow-hidden rounded-full bg-muted sm:w-36 md:w-[200px]">
                    {field.value ? (
                      <figure className="inner:!m-1 inner:rounded-full h-full w-full relative">
                        <Image
                          className="rounded-full object-cover transition "
                          src={field.value}
                          alt="Imagen de perfil para tu mascota"
                          fill
                        />
                      </figure>
                    ) : (
                      <Icon className="inner:!m-1 inner:rounded-full mx-auto my-0 flex h-full w-3/4 items-center justify-center bg-muted" />
                    )}

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="group/inner absolute
                          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                          rounded-full bg-black/25 p-4 text-white focus-visible:bg-black/20 group-hover:bg-black/50"
                            onClick={() => profileInputFileRef.current?.click()}
                          >
                            <CameraIcon className="hover-animation text-dark-primary h-6 w-6 " />
                          </button>
                        </TooltipTrigger>

                        <TooltipContent>
                          <p>Añadir foto</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </>
              </FormControl>
            </FormItem>
          )
        }}
      />
    </div>
  )
}

export default ImageUploadInput
