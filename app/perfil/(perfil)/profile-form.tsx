"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import SocialMediaURLSelect from "./social-media-url-select";
import { StatesSelector } from "@/components/states-selector";
import { Loader2Icon } from "lucide-react";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "El nombre debe ser por lo menos de dos caracteres.",
    })
    .max(30, {
      message: "El nombre debe ser maximo de 30 caracteres.",
    }),
  email: z.string().email(),
  bio: z.string().optional(),
  url: z.string().optional(),
  urls: z.array(z.object({ url: z.string(), value: z.string() })).optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || undefined,
      // @ts-ignore
      urls: user?.links || [],
      url: "",
      phone: user?.phone || "",
      location: user?.location || "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsSaving(true);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSaving(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nombre <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='Nombre' {...field} />
              </FormControl>
              <FormDescription>
                Este es tu nombre público. Puede ser tu nombre real o un
                seudónimo. Solo puedes cambiar esto una vez cada 30 días.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} disabled={true} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografía</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Cuenta algo sobre ti...'
                  className='resize-none'
                  {...field}
                  maxLength={160}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SocialMediaURLSelect form={form} />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefono (opcional)</FormLabel>
              <FormControl>
                <Input
                  type='tel'
                  placeholder='(00) 0000-0000'
                  {...field}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value;
                    const formattedValue = value
                      .replace(/\D/g, "") // Remove non-digit characters
                      .replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1)-$2-$3"); // Apply mask pattern

                    field.onChange(formattedValue);
                  }}
                />
              </FormControl>
              <FormDescription>
                No se mostrará en tu perfil, solo es para que las empresas
                puedan contactarte.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={() => (
            <FormItem>
              <FormLabel>Estado de residencia (opcional)</FormLabel>
              <FormControl>
                <StatesSelector control={form.control} />
              </FormControl>
              <FormDescription>
                El estado de México donde actualmente vives.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type='submit' disabled={!form.formState.isDirty || isSaving}>
          {isSaving ? <Loader2Icon /> : "Actualizar perfil"}
        </Button>
      </form>
    </Form>
  );
};
