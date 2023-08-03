import { ImageIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ImageUploadInput from "./image-upload-input";
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
import { Category } from "@prisma/client";
import { useFormState } from "@/app/dashboard/components/company-form-context";
import { CategoriesMultiSelect } from "./categories-multi-select";

const formSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(1).max(25),
  description: z.string().min(1).max(300),
  categories: z.array(z.string()).min(1),
});

export default function DetailsStepForm() {
  const { onHandleNext, setFormData, formData, company } = useFormState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: company?.image || formData?.image,
      name: company?.name || formData?.name || "",
      description: company?.description || formData?.description,
      categories:
        formData?.categories ||
        company?.categories.map((c: Category) => c.id) ||
        [],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ImageUploadInput form={form} Icon={ImageIcon} />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nombre <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Nombre" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CategoriesMultiSelect control={form.control} />

        <Button type="submit" disabled={!form.formState.isValid}>
          siguiente
        </Button>
      </form>
    </Form>
  );
}
