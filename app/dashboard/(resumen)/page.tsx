import { Metadata } from "next";

import { ROLE } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import EmptyInitialScreen from "./empty-iinitial-screen";
import NavigationBar from "./navigation-bar";
import MainContent from "./main-content";
import { DashboardContextProvider } from "../components/dashboard-context";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Administra tu negocio con el dashboard.",
};

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

export default async function DashboardPage() {
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
    <DashboardContextProvider companies={data.companies}>
      <section className="h-screen">
        <div className="flex flex-col h-screen">
          {/* NAVBAR */}

          <NavigationBar />

          {/* CONTENT */}

          <MainContent />
        </div>
      </section>
    </DashboardContextProvider>
  );
}
