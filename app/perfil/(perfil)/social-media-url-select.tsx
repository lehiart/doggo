"use client";

import React from "react";
import { useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Trash2Icon,
  GlobeIcon,
  InstagramIcon,
  TwitterIcon,
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  LinkIcon,
  PlusIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

type IconType =
  | "website"
  | "twitter"
  | "github"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "tiktok";

interface Icons {
  [key: string]: React.ComponentType<any>;
}

const icons: Icons = {
  website: GlobeIcon,
  twitter: TwitterIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: LinkIcon,
};

function SocialMediaIcon({ type }: { type: IconType | string }) {
  const Icon = icons[type];

  return <Icon className='h-4 w-4' />;
}

const socialMap = [
  { value: "website", label: "Website" },
  { value: "twitter", label: "Twitter" },
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
];

function SocialMediaURLSelect({ form }: { form: any }) {
  const [open, setOpen] = React.useState(false);
  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const watchURLinput = form.watch("url");

  function handleDeleteURL(
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) {
    e.preventDefault();
    remove(index);
  }

  // {
  //   /* <Input
  //           {...form.register("url")}
  //           placeholder='http://facebook.com/dogehouse'
  //         /> */
  // }

  return (
    <div>
      <Label htmlFor='url'>Mis Links</Label>

      <Card className='mt-2'>
        <CardHeader>
          <CardDescription>
            Agrega enlaces a tu sitio web, blog o perfiles de redes sociales.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className='flex flex-col md:flex-row'>
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      placeholder='http://facebook.com/dogehouse'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='secondary'
                  className='shrink-0 ml-0 mt-2 md:ml-2 md:mt-0'
                  disabled={fields.length >= 8 || !watchURLinput}
                >
                  <PlusIcon className='mr-2 h-4 w-4' />
                  Agregar Link
                </Button>
              </PopoverTrigger>

              <PopoverContent className='p-0' side='bottom' align='start'>
                <Command>
                  <CommandInput placeholder='Buscar por nombre...' />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup>
                      {socialMap.map((element) => (
                        <CommandItem
                          key={element.value}
                          className='cursor-pointer'
                          onSelect={() => {
                            append({
                              value: element.value,
                              url: form.getValues("url"),
                            });

                            setOpen(false);
                            form.setValue("url", "");
                          }}
                        >
                          <SocialMediaIcon type={element.value} />
                          <span className='ml-2'>{element.label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <Separator className='my-4' />

          <div className='space-y-4'>
            <div className='grid gap-6'>
              {fields.length === 0 && (
                <div className='flex items-center justify-center mt-6'>
                  <span className='text-sm text-muted-foreground'>
                    No tienes ningun link a tu sitio o redes
                  </span>
                </div>
              )}

              <ul>
                {fields.map((item: any, index: number) => {
                  return (
                    <li
                      key={item.id}
                      className='flex items-center justify-between space-x-4 mb-4'
                    >
                      <div className='flex items-center space-x-4 w-full'>
                        <div className='rounded-full bg-muted p-3'>
                          <SocialMediaIcon type={item.value} />
                        </div>

                        <div className='w-full'>
                          <Input
                            {...form.register(`urls.${index}.url`)}
                            disabled
                          />
                        </div>
                      </div>

                      <Button
                        className='ml-4'
                        onClick={(e) => {
                          handleDeleteURL(e, index);
                        }}
                      >
                        <span className='sr-only'>Borrar</span>
                        <Trash2Icon />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SocialMediaURLSelect;
