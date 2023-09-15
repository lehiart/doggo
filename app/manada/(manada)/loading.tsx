import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function MyPackLoadingPage() {
  return (
    <div id="pack-list" className="md:py-4 lg:pl-8 lg:pr-0 lg:mt-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        <li>
          <Card>
            <CardHeader>
              <Skeleton className="h-52" />
            </CardHeader>

            <CardHeader className="flex flex-col">
              <CardTitle>
                <Skeleton className="w-[100px] h-8" />
              </CardTitle>
              <CardTitle>
                <Skeleton className="w-[100px] h-8" />
              </CardTitle>
            </CardHeader>
            <CardFooter className="gap-2">
              <Skeleton className="w-2/3 h-8" />
              <Skeleton className="w-1/3 h-8" />
            </CardFooter>
          </Card>
        </li>
        <li>
          <Card>
            <CardHeader>
              <Skeleton className="h-52" />
            </CardHeader>

            <CardHeader className="flex flex-col">
              <CardTitle>
                <Skeleton className="w-[100px] h-8" />
              </CardTitle>
              <CardTitle>
                <Skeleton className="w-[100px] h-8" />
              </CardTitle>
            </CardHeader>
            <CardFooter className="gap-2">
              <Skeleton className="w-2/3 h-8" />
              <Skeleton className="w-1/3 h-8" />
            </CardFooter>
          </Card>
        </li>
        <li className="hidden lg:block">
          <Card>
            <CardHeader>
              <Skeleton className="h-52" />
            </CardHeader>

            <CardHeader className="flex flex-col">
              <CardTitle>
                <Skeleton className="w-[100px] h-8" />
              </CardTitle>
              <CardTitle>
                <Skeleton className="w-[100px] h-8" />
              </CardTitle>
            </CardHeader>
            <CardFooter className="gap-2">
              <Skeleton className="w-2/3 h-8" />
              <Skeleton className="w-1/3 h-8" />
            </CardFooter>
          </Card>
        </li>
        <li className="hidden lg:block">
          <Card>
            <CardHeader>
              <Skeleton className="h-52" />
            </CardHeader>

            <CardHeader className="flex flex-col">
              <CardTitle>
                <Skeleton className="w-[100px] h-8" />
              </CardTitle>
              <CardTitle>
                <Skeleton className="w-[100px] h-8" />
              </CardTitle>
            </CardHeader>
            <CardFooter className="gap-2">
              <Skeleton className="w-2/3 h-8" />
              <Skeleton className="w-1/3 h-8" />
            </CardFooter>
          </Card>
        </li>
      </ul>
    </div>
  )
}
