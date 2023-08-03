import { Metadata } from "next";

import NavigationBar from "../components/navigation-bar";
import { DashboardContextProvider } from "../components/dashboard-context";
import { ROLE } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import EmptyInitialScreen from "../components/empty-iinitial-screen";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Administra tu negocio con el dashboard.",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

async function getDashboardData() {
  const user = await getCurrentUser();

  if (!user || !user?.id) {
    redirect("/login");
  }

  const data = await db.user.findUnique({
    where: {
      role: ROLE.COMPANY,
      id: user.id,
    },
    select: {
      companies: {
        select: {
          id: true,
          name: true,
          pro: true,
        },
      },
    },
  });

  return data;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const data = await getDashboardData();

  if (!data?.companies || data?.companies.length === 0) {
    return (
      <section className="h-screen">
        <div className="flex flex-col h-screen">
          <EmptyInitialScreen />
        </div>
      </section>
    );
  }

  return (
    <DashboardContextProvider companies={data?.companies}>
      <section className="h-screen">
        <div className="flex flex-col h-screen">
          <NavigationBar />

          {children}
        </div>
      </section>
    </DashboardContextProvider>
  );
}
