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
  const { onHandleNext, onHandleBack, setFormData, formData } = useFormState();

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
    setFormData((prev: any) => ({ ...prev, ...data }));
    // onHandleNext();
    // add new succes page or trigger the create/edit company mutation
    console.log(formData);
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
                <Input
                  // placeholder='Nombre o apodo'
                  autoComplete="off"
                  {...field}
                />
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
                <Input
                  // placeholder='Nombre o apodo'
                  autoComplete="off"
                  {...field}
                />
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
          <Button type="submit" disabled={!form.formState.isValid}>
            Completar
          </Button>
        </div>
      </form>
    </Form>
  );
}
