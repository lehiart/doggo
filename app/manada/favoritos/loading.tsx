import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function MyFavoritesLoadingPage() {
  return (
    <section className="flex flex-col justify-between w-full items-center space-y-4 mb-4 mt-2">
      <h2 className="text-2xl font-bold text-center md:text-left">Favoritos</h2>
      <Skeleton className="w-1/2 h-8" />

      <div className="flex w-full h-full gap-4">
        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-1/4 h-8" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
        <Card>
          <CardHeader>
            <Skeleton className="w-full h-64" />
          </CardHeader>
          <CardContent className="pt-6">
            <CardTitle className="mb-4 break-words">
              <Skeleton className="w-full h-8" />
            </CardTitle>
            <CardDescription className="break-words">
              <Skeleton className="w-full h-8" />
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-1/2 h-8" />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="w-full h-64" />
          </CardHeader>
          <CardContent className="pt-6">
            <CardTitle className="mb-4 break-words">
              <Skeleton className="w-full h-8" />
            </CardTitle>
            <CardDescription className="break-words">
              <Skeleton className="w-full h-8" />
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-1/2 h-8" />
          </CardFooter>
        </Card>

        <Card className="hidden md:block">
          <CardHeader>
            <Skeleton className="w-full h-64" />
          </CardHeader>
          <CardContent className="pt-6">
            <CardTitle className="mb-4 break-words">
              <Skeleton className="w-full h-8" />
            </CardTitle>
            <CardDescription className="break-words">
              <Skeleton className="w-full h-8" />
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-1/2 h-8" />
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
