import { useRef } from "react";
import type { ChangeEvent } from "react";
import { toast } from "@/components/ui/use-toast";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getImagesData } from "@/lib/validations/image";
import Image from "next/image";
import { CameraIcon, DogIcon, User2Icon } from "lucide-react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

export const ImageUploadInput = ({ form, type }: any) => {
  const profileInputFileRef = useRef<HTMLInputElement>(null);

  const editImage = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>): void => {
    const imagesData = getImagesData(files);

    if (!imagesData) {
      toast({ title: "Por favor, elige una imagen válida." });
      return;
    }

    const { imagesPreviewData, selectedImagesData } = imagesData;

    const newImage = imagesPreviewData[0].src;
    //TODO: upload image to server with and save the url string to user profile
    form.setValue("image", newImage);
  };

  const MyIcon = type === "user" ? User2Icon : DogIcon;

  return (
    <div className="relative mx-auto my-16 flex w-32 justify-center md:w-[200px]">
      <FormField
        control={form.control}
        name="image"
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

                  <div className="group aspect-square w-32 overflow-hidden rounded-full sm:w-36 md:w-[200px]">
                    {field.value ? (
                      <figure className="inner:!m-1 inner:rounded-full h-full w-full">
                        <Image
                          className="rounded-full transition "
                          src={field.value}
                          alt="alt"
                          layout="fill"
                        />
                      </figure>
                    ) : (
                      <MyIcon
                        className="inner:!m-1 inner:rounded-full flex h-full
                    h-full w-full w-full items-center justify-center rounded-full bg-muted"
                      />
                    )}

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="group/inner absolute
                          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                          rounded-full bg-black/25 p-4 text-white focus-visible:bg-black/50 group-hover:bg-black/50"
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
          );
        }}
      />
    </div>
  );
};

export default ImageUploadInput;
