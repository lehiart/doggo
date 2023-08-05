'use client'

import { useCategories } from '@/lib/category'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '../ui/checkbox'

type Category = Record<'value' | 'label' | 'id', string>

export function CategoriesMultiSelect({ control }: any) {
  const { categories } = useCategories()

  return (
    <FormField
      control={control}
      name="categories"
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Categorias</FormLabel>
            <FormDescription>
              Selecciona las categorias que representen a tu negocio o marca.
            </FormDescription>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-scroll py-2">
            {categories.map((item: Category) => (
              <FormField
                key={item.id}
                control={control}
                name="categories"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== item.id,
                                  ),
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
