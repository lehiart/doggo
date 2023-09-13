import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function MyRequestsLoadingPage() {
  return (
    <section className="flex flex-col justify-between w-full items-center space-y-8 mb-4 mt-2">
      <h2 className="text-2xl font-bold text-center md:text-left mb-4">
        Estas son las solicitudes que has hecho
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-2 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <Skeleton className="w-[200px] h-8" />

            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-[200px] h-20" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <Skeleton className="w-[200px] h-8" />

            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-[200px] h-20" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <Skeleton className="w-[200px] h-8" />

            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-[200px] h-20" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <Skeleton className="w-[200px] h-8" />

            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-[200px] h-20" />
          </CardContent>
        </Card>
      </div>

      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
    </section>
  )
}
