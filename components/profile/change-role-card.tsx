import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { ROLE } from '@/lib/constants'

export function ChangeRoleCard({ role }: { role: string }) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Cambiar tipo de cuenta</CardTitle>
        <CardDescription>
          Actualmente tu cuenta es de tipo:{' '}
          <b>{role === ROLE.COMPANY ? 'NEGOCIO' : 'USUARIO'}</b>
        </CardDescription>{' '}
      </CardHeader>
      <CardContent className="w-50 grid gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="w-fit">
              Cambiar a cuenta de{' '}
              {role === ROLE.COMPANY ? 'usuario' : 'negocio'}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="mb-4">Cambiar tipo de cuenta</DialogTitle>
              <DialogDescription>
                <p className="mt-4">
                  Por el momento el cambio manual esta desactivado.
                </p>

                <p className="mt-4">
                  Te recomendamos crear una nueva cuenta de tipo{' '}
                  {role === ROLE.COMPANY ? 'usuario' : 'negocio'}, para que
                  conserves ambas cuentas. Ya que al hacer el cambio, tus datos
                  guardados se perderan. tambien algunas de tus opciones y
                  vistas del sitio cambiaran.
                </p>

                <p className="mt-4">
                  Si aun asi deseas el cambio, escribenos a contacto@doghouse.mx
                </p>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-4 gap-2">
              <DialogClose asChild>
                <Button type="submit">Enterado</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
