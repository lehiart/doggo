import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { StickyNoteIcon } from 'lucide-react'

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <StickyNoteIcon />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Crear preguntas frecuentes
          </p>
        </div>
        <div className="ml-auto font-medium">
          <Button size="sm" className=" py-2 px-4 rounded">
            Crear
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <StickyNoteIcon />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Crear preguntas frecuentes
          </p>
        </div>
        <div className="ml-auto font-medium">
          <Button size="sm" className=" py-2 px-4 rounded">
            Crear
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <StickyNoteIcon />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Crear preguntas frecuentes
          </p>
        </div>
        <div className="ml-auto font-medium">
          <Button size="sm" className=" py-2 px-4 rounded">
            Crear
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <StickyNoteIcon />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Crear preguntas frecuentes
          </p>
        </div>
        <div className="ml-auto font-medium">
          <Button size="sm" className=" py-2 px-4 rounded">
            Crear
          </Button>
        </div>
      </div>
    </div>
  )
}
