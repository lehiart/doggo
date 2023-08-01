"use client";

import { Company } from "@prisma/client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface DashboardContext {
  selectedCompany: Pick<Company, "id" | "name" | "pro"> | null;
  setSelectedCompany: Dispatch<SetStateAction<any>>;
  companies: Pick<Company, "id" | "name" | "pro">[];
}

const DashboardContext = createContext<DashboardContext>({
  setSelectedCompany: () => {},
  selectedCompany: null,
  companies: [],
});

interface IProps {
  children: ReactNode;
  companies: Pick<Company, "id" | "name" | "pro">[];
}

function DashboardContextProvider({ children, companies }: IProps) {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <DashboardContext.Provider
      value={{
        selectedCompany,
        setSelectedCompany,
        companies,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

function useDashboardContext() {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error("useSiteContext must be used within a SiteContextProvider");
  }

  return context;
}

export { DashboardContextProvider, useDashboardContext };
