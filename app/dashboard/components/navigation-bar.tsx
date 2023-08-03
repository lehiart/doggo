import React from "react";
import TeamSwitcher from "./team-switcher";
import { MainNav } from "./main-nav";

export default async function NavigationBar() {
  return (
    <div className="border-b px-8">
      <div className="flex h-16 items-center">
        <TeamSwitcher />
        <MainNav className="ml-6" />
      </div>
    </div>
  );
}
