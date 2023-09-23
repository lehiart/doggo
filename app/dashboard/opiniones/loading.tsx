import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function DashboardOpinionsLoadingPage() {
  return (
    <section className="flex flex-col justify-between w-full items-center space-y-8 mb-4 mt-4">
      <h2 className="text-2xl font-bold text-center md:text-left">
        Estas son las opniones que has recibido
      </h2>

      <Skeleton className="h-36" />

      <Separator />

      <div className="grid gap-4 grid-cols-2 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Skeleton className="h-20" />
            </div>
            <p className="text-xs text-muted-foreground">
              <Skeleton className="h-8" />
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20" />
          </CardContent>
        </Card>
      </div>

      <Skeleton className="h-52" />
    </section>
  )
}
