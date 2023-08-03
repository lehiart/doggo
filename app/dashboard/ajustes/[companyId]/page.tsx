import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category, Company } from "@prisma/client";
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import DeleteCard from "../../components/delete-card";
import { ChevronLeftIcon } from "lucide-react";

async function getCompanyData(companyId: Company["id"]) {
  return await db.company.findUnique({
    where: {
      id: companyId,
    },
    include: {
      categories: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
}

interface CompanyEditorPageProps {
  params: { companyId: string };
}

export default async function CompanySettingsPage({
  params,
}: CompanyEditorPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const company: any = await getCompanyData(params.companyId);

  if (!company) {
    redirect("/dashboard");
  }

  return (
    <div className="block min-h-screen space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Ajustes</h2>
        <p className="text-muted-foreground">
          Administra la configuración de tu negocio
        </p>
        <Link href="/dashboard">
          <Button>
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            <span>Atras</span>
          </Button>
        </Link>
        <div className="flex gap-2 justify-end">
          <Button>
            <Link href={`/dashboard/ajustes/${company.id}/editar`}>Editar</Link>
          </Button>
          <DeleteCard companyId={company.id} />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:max-w-2xl">
          {" "}
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle>Informacion de {company?.name}</CardTitle>
            </CardHeader>
            <CardContent className="w-50 grid gap-4">
              <p>Nombre: {company?.name}</p>

              <p>Tipo de cuenta: {company?.pro ? "PRO" : "Gratuita"}</p>

              <p>Foto:</p>

              <p>descripcion: {company?.description}</p>

              <p>
                {` Direccion: ${company.streetAddress} ${company.streetNumber}, ${company.locality}, ${company.city}, ${company.state}, ${company.zip}`}
              </p>

              <p>Telefono: {company?.phone}</p>

              <p>Email: {company?.email}</p>

              <p>Website: {company?.website}</p>

              <div>
                Redes sociales:{" "}
                {company.socialMediaLinks && (
                  <ul>
                    {JSON.parse(company.socialMediaLinks).map(
                      (item: Category) => (
                        <li key={item.id}>{item.name}</li>
                      ),
                    )}
                  </ul>
                )}
              </div>

              <div>
                Categorias:{" "}
                <ul>
                  {company.categories.map((item: Category) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
