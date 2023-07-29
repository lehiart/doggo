"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StatesSelector } from "./states-selector";
import { Company } from "@prisma/client";
import { useFormState } from "@/app/dashboard/components/company-form-context";
import { Button } from "./ui/button";

const formSchema = z.object({
  streetAddress: z.string(),
  streetNumber: z.string().optional(),
  streetAddress2: z.string().optional(),
  locality: z.string(),
  city: z.string(),
  state: z.string().optional(),
  zip: z.string(),
});

interface AddressStepFormProps {
  company?:
    | Pick<
        Company,
        | "streetAddress"
        | "streetNumber"
        | "streetAddress2"
        | "locality"
        | "city"
        | "state"
        | "zip"
      >
    | undefined;
}

export default function AddressStepForm({ company }: AddressStepFormProps) {
  const { onHandleNext, onHandleBack, setFormData, formData } = useFormState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      streetAddress: company?.streetAddress || formData?.streetAddress,
      streetNumber: company?.streetNumber || formData?.streetNumber,
      streetAddress2: company?.streetAddress2 || formData?.streetAddress2,
      locality: company?.locality || formData?.locality,
      city: company?.city || formData?.city,
      state: company?.state || formData?.state,
      zip: company?.zip || formData?.zip,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Direccion</CardTitle>
        <CardDescription>
          What area are you having problems with?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calle</FormLabel>
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
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="streetNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numero exterior</FormLabel>
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
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="streetAddress2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numero interior</FormLabel>
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
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="locality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colonia</FormLabel>
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
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alcaldia/Municipio/Ciudad</FormLabel>
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
              </div>
              <div className="grid gap-2">
                <StatesSelector control={form.control} inputName="state" />
              </div>
            </div>

            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Codigo Postal</FormLabel>
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
            </div>
            <Button type="button" onClick={onHandleBack}>
              atras
            </Button>
            <Button type="submit" disabled={!form.formState.isValid}>
              siguiente
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
