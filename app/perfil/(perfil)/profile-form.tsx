"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Loader2Icon, User2Icon } from "lucide-react";
import ImageUploadInput from "../../../components/image-upload-input";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "El nombre debe ser por lo menos de dos caracteres.",
    })
    .max(30, {
      message: "El nombre debe ser maximo de 30 caracteres.",
    }),
  email: z.string().email(),
  image: z.string().optional(),
  bio: z.string().optional(),
  url: z.string().optional(),
  links: z
    .array(z.object({ url: z.string(), value: z.string(), id: z.string() }))
    .optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
});

type FormData = z.infer<typeof profileFormSchema>;

export interface ProfileFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  userProfile: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    profile: {
      id: string;
      bio: string | null;
      location: string | null;
      phone: string | null;
      links: string | null;
    };
  };
}

const cleanData = (data: any) => {
  // we dont need the url on the payload
  const { url, ...remainingData } = data;

  // links needs to be an string
  if (remainingData.links) {
    remainingData.links = JSON.stringify(remainingData.links);
  }

  // phone needs to be a number without mask
  if (remainingData.phone) {
    remainingData.phone = remainingData.phone.replace(/\D/g, "");
  }

  return remainingData;
};

const addMaskToPhone = (phone: string) => {
  if (!phone) return "";

  const phoneMask = phone
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1)-$2-$3"); // Apply mask pattern

  return phoneMask;
};

export const ProfileForm = ({ userProfile }: ProfileFormProps) => {
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      image: userProfile?.image || "",
      bio: userProfile?.profile?.bio || "",
      url: "",
      links:
        (userProfile?.profile?.links &&
          JSON.parse(userProfile.profile?.links)) ||
        "",
      phone:
        (userProfile?.profile?.phone &&
          addMaskToPhone(userProfile.profile?.phone)) ||
        "",
      location: userProfile?.profile?.location || "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    type DirtyField = {
      [key: string]: boolean;
    };

    type DirtyFields = {
      dirtyFields: DirtyField;
    };

    // Only add the dirty fields to the payload
    const { dirtyFields }: any = form.formState; // {password: true, email: true}
    const cleanedData = cleanData(data); // {password: "123", email: "email@example.com"}

    const payload: { [key: string]: string | null } = Object.keys(
      cleanedData
    ).reduce((acc: { [key: string]: string | null }, key: string) => {
      if (dirtyFields[key as keyof DirtyFields]) {
        acc[key] = cleanedData[key as keyof typeof cleanedData];
      }
      return acc;
    }, {});

    //is client so make it on the server route.ts
    try {
      const result = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          ...payload,
          userId: userProfile.id,
          updatedAt: new Date(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Tu perfil se ha actualizado correctamente.",
      });
    } catch (err) {
      toast({
        title:
          "Hubo un error al guardar los datos. Por favor intenta de nuevo.",
        description: "Si el problema persiste, contacta a soporte.",
        variant: "destructive",
      });
    }

    setIsSaving(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ImageUploadInput form={form} Icon={User2Icon} />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nombre <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} disabled={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografía</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuenta algo sobre ti..."
                  className="resize-none"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefono (opcional)</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="(00) 0000-0000"
                  {...field}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value;
                    const formattedValue = addMaskToPhone(value);

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
          name="location"
          render={() => (
            <FormItem>
              <FormLabel>Estado de residencia (opcional)</FormLabel>
              <FormControl>
                <StatesSelector control={form.control} inputName="location" />
              </FormControl>
              <FormDescription>
                El estado de México donde actualmente vives.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.formState.isDirty || isSaving}>
          {isSaving ? <Loader2Icon /> : "Actualizar perfil"}
        </Button>
      </form>
    </Form>
  );
};
