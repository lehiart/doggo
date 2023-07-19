import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileAccountPageLoading() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cuenta</h3>
        <p className="text-sm text-muted-foreground">
          Actualiza la configuración de tu cuenta.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-1/5" />
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
        <CardContent className="h-10" />
        <CardFooter>
          <Skeleton className="h-8 w-[120px]" />
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-1/5" />
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
        <CardContent className="h-10" />
        <CardFooter>
          <Skeleton className="h-8 w-[120px]" />
        </CardFooter>
      </Card>
    </div>
  );
}
