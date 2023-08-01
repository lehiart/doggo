import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Company } from "@prisma/client";
import { useFormState } from "@/app/dashboard/components/company-form-context";
import { ChevronLeft } from "lucide-react";
import SocialMediaURLSelect from "./social-media-url-select";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  phone: z.string(),
  email: z.string().email(),
  website: z.string().optional(),
  socialMediaLinks: z
    .array(z.object({ url: z.string(), value: z.string(), id: z.string() }))
    .optional(),
});

interface DetailsStepFormProps {
  company?:
    | Pick<Company, "phone" | "email" | "website" | "socialMediaLinks">
    | undefined;
}

export default function ContactStepForm({ company }: DetailsStepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { onHandleBack, setFormData, formData, id, type } = useFormState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: company?.phone || formData?.phone,
      email: company?.email || formData?.email,
      website: company?.website || formData?.website,
      socialMediaLinks:
        (company?.socialMediaLinks && JSON.parse(company.socialMediaLinks)) ||
        (formData?.socialMediaLink && JSON.parse(formData?.socialMediaLinks)) ||
        "",
    },
  });
  console.log(form.getValues());

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setFormData((prev: any) => ({ ...prev, ...data }));

    const payload = {
      ...formData,
      id,
    };

    // socialMediaLinks needs to be an string
    if (payload.socialMediaLinks) {
      payload.socialMediaLinks = JSON.stringify(payload.socialMediaLinks);
    }

    try {
      const result = await fetch("/api/company", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (result.ok) {
        router.refresh();
        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        title:
          "Hubo un error al guardar los datos. Por favor intenta de nuevo.",
        description: "Si el problema persiste, contacta a soporte.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Telefono <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input autoComplete="off" maxLength={10} {...field} />
              </FormControl>
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
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Sitio web <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SocialMediaURLSelect form={form} inputName="socialMediaLinks" />

        <div className="flex gap-2 w-full justify-between">
          <Button type="button" onClick={onHandleBack}>
            <ChevronLeft className="mr-2" />
            Atras
          </Button>
          <Button type="submit" disabled={isLoading || !form.formState.isValid}>
            Completar
          </Button>
        </div>
      </form>
    </Form>
  );
}
