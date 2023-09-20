import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function DashboardSettingsLoadingPage() {
  return (
    <div className="block min-h-screen space-y-6 pb-16 pt-4">
      {/* <Skeleton className="w-1/2 h-8" />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-left">Ajustes</h2>

        <p className="text-muted-foreground">
          Administra los datos de tu negocio
        </p>
      </div>

      <Separator className="my-6" /> */}

      <Card>
        <CardHeader className="p-0 w-full relative h-64">
          <div className="bg-white">
            <div className="rounded-t-lg h-32 overflow-hidden relative">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
        </CardHeader>

        <CardHeader className="-mt-16">
          <CardTitle>
            <Skeleton className="w-1/2 h-8" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="w-1/2 h-8" />
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid space-y-4 grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-between space-x-2">
              <Skeleton className="w-1/2 h-8" />
              <Skeleton className="w-1/2 h-8" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
