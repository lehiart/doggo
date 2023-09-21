'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import { Overview } from './overview'
// import { RecentSales } from './recent-sales'

import {
  EyeIcon,
  MailIcon,
  MessageCircleIcon,
  StarHalfIcon,
  StarIcon,
  UserCheckIcon,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { useDashboardContext } from '../../../components/dashboard/dashboard-context'

export default function CompanySummaryPage() {
  const { selectedCompany } = useDashboardContext()

  return (
    <div className="flex-1 space-y-4 py-6 h-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {selectedCompany?.name}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Solicitudes recibidas
            </CardTitle>
            <MailIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opiniones</CardTitle>
            <MessageCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vistas de tus servicios y productos
            </CardTitle>
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clicks en Ver Contacto
            </CardTitle>
            <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <Tabs defaultValue="views" className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Estadísticas</CardTitle>
              {/* <TabsList>
                <TabsTrigger value="views">Visitas</TabsTrigger>
                <TabsTrigger value="requests">Solicitudes</TabsTrigger>
                <TabsTrigger value="contact">Contacto</TabsTrigger>
              </TabsList> */}
            </CardHeader>
            <CardContent className="pl-2">
              <TabsContent value="views">
                <div className="px-4 mb-4">
                  <div>Visitas de mis servicios y productos </div>
                  <div>
                    Esta gráfica te permite ver el número de impresiones de tu
                    escaparate por usuarios interesados en tus servicios
                  </div>
                </div>
                {/* <Overview /> */}
              </TabsContent>
              <TabsContent value="requests">
                Solicitudes
                <div>
                  Esta gráfica muestra el número de solicitudes realizadas por
                  usuarios interesados en tus servicios.
                </div>
                {/* <Overview /> */}
              </TabsContent>
              <TabsContent value="contact">
                Clicks en ver Contacto
                <div>
                  Esta gráfica muestra el número de veces que los usuarios
                  interesados en tus servicios vieron tu número de teléfono.
                </div>
                {/* <Overview /> */}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Completa tu anuncio</CardTitle>
            <div>
              Solo faltan 5 pasos para completar tu escaparate.
              <div className="flex gap-4 items-center my-4">
                <Progress value={33} /> <span>33%</span>
              </div>
              {/* 1 - datos de detalles 2 - datos de direccion 3 - datos de contacto ( podria ser solo uno sobre completar datos de contacto) */}
              {/* 4 - agregar 1 servicio */}
              {/* 5 - agregar datos completos de 1 servicio */}
            </div>
          </CardHeader>
          {/* <CardContent>
            <RecentSales />
          </CardContent> */}
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Tu calificacion actual es: </CardTitle>
            <CardDescription>
              Aumenta tu puntaje con las opiniones de tus clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full">
              <StarIcon fill="gold" />
              <StarIcon fill="gold" />
              <StarIcon fill="gold" />
              <StarHalfIcon fill="gold" />
              <StarIcon />
            </div>
            <div>4.5 / 5.0</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
