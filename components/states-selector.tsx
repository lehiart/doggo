"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import { Controller } from "react-hook-form";

const statesOfMexico = [
  { value: "AGS", label: "Aguascalientes" },
  { value: "BC", label: "Baja California" },
  { value: "BCS", label: "Baja California Sur" },
  { value: "CAMP", label: "Campeche" },
  { value: "COAH", label: "Coahuila" },
  { value: "COL", label: "Colima" },
  { value: "CHIS", label: "Chiapas" },
  { value: "CHIH", label: "Chihuahua" },
  { value: "CDMX", label: "Ciudad de México" },
  { value: "DGO", label: "Durango" },
  { value: "GTO", label: "Guanajuato" },
  { value: "GRO", label: "Guerrero" },
  { value: "HGO", label: "Hidalgo" },
  { value: "JAL", label: "Jalisco" },
  { value: "MEX", label: "México" },
  { value: "MICH", label: "Michoacán" },
  { value: "MOR", label: "Morelos" },
  { value: "NAY", label: "Nayarit" },
  { value: "NL", label: "Nuevo León" },
  { value: "OAX", label: "Oaxaca" },
  { value: "PUE", label: "Puebla" },
  { value: "QRO", label: "Querétaro" },
  { value: "QR", label: "Quintana Roo" },
  { value: "SLP", label: "San Luis Potosí" },
  { value: "SIN", label: "Sinaloa" },
  { value: "SON", label: "Sonora" },
  { value: "TAB", label: "Tabasco" },
  { value: "TAMPS", label: "Tamaulipas" },
  { value: "TLAX", label: "Tlaxcala" },
  { value: "VER", label: "Veracruz" },
  { value: "YUC", label: "Yucatán" },
  { value: "ZAC", label: "Zacatecas" },
];

export function StatesSelector({ control }: { control: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-[200px] justify-between",
                  !value && "text-muted-foreground"
                )}
              >
                {value
                  ? statesOfMexico.find(
                      (state) => state.value === value.toUpperCase()
                    )?.label
                  : "Selecciona el estado"}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Buscar estado..." />
                <CommandEmpty>
                  No se encontro ningun estado con ese nombre.
                </CommandEmpty>
                <CommandGroup className="h-[200px] overflow-y-scroll">
                  {statesOfMexico.map((state) => (
                    <CommandItem
                      value={state.value}
                      key={state.value}
                      onSelect={(value) => {
                        onChange(value.toUpperCase());
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          state.value === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {state.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
}
