import { useFormState } from './company-form-context'
import { cn } from '@/lib/utils'

export default function CompanyFormHeader() {
  const { step } = useFormState()

  if (step > 3) return null

  return (
    <div>
      {/* {JSON.stringify(formData, null, 2)} */}
      <h2 className="sr-only">Steps</h2>

      <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
        <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
          <li className="flex items-center gap-2 bg-white dark:bg-black p-2">
            <span
              className={cn(
                'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold  ',
                step >= 1 && 'bg-blue-600 text-white',
              )}
            >
              1
            </span>

            <span className="hidden sm:block"> Detalles </span>
          </li>

          <li className="flex items-center gap-2 bg-white dark:bg-black p-2 ">
            <span
              className={cn(
                'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold  ',
                step >= 2 && 'bg-blue-600 text-white',
              )}
            >
              2
            </span>

            <span className="hidden sm:block"> Direccion </span>
          </li>

          <li className="flex items-center gap-2 bg-white dark:bg-black p-2">
            <span
              className={cn(
                'h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold  ',
                step >= 3 && 'bg-blue-600 text-white',
              )}
            >
              3
            </span>

            <span className="hidden sm:block"> Contacto </span>
          </li>
        </ol>
      </div>
    </div>
  )
}
