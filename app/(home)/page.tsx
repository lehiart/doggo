"use client";

import { StatesSelector } from "@/components/states-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function Home() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      location: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    // console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 pt-12 text-center">
          <h1 className="font-heading mb-10 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Encuentra todo lo que necesitas para tu perro.
          </h1>

          <form
            className="mt-8 flex items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-[200px] md:w-[200px] lg:w-[300px]"
            />

            <p className=" mx-4 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              en
            </p>

            <StatesSelector control={control} />

            <Button type="submit" className="ml-4">
              Buscar
            </Button>
          </form>

          {/* el texto se ira cambiando, ver si es seo friendly  manada/familia/mascota/perrhijo */}
          <h2 className="font-heading mt-10 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Somos el directorio de servicios para tu (perro) más grande de
            México.
          </h2>
        </div>
      </section>
    </main>
  );
}
