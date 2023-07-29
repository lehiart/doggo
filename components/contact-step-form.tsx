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

const formSchema = z.object({
  phone: z.string(),
  email: z.string(),
  website: z.string(),
  socialMediaLinks: z.string(),
  // categories: z.array(z.string()).optional(), //why categories not working?
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
      socialMediaLinks: company?.socialMediaLinks || formData?.socialMediaLinks,
      // categories: company?.categories || formData?.categories,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setFormData((prev: any) => ({ ...prev, ...data }));
    // onHandleNext();
    // add new succes page or trigger the create/edit company mutation
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
                  placeholder="Nombre o apodo"
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
                  placeholder="Nombre o apodo"
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

        <FormField
          control={form.control}
          name="socialMediaLinks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Redes sociales <span className="text-red-500">*</span>
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
        <Button type="button" onClick={onHandleBack}>
          atras
        </Button>
        <Button type="submit" disabled={!form.formState.isValid}>
          Completar
        </Button>
      </form>
    </Form>
  );
}
