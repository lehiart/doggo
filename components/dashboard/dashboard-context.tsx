'use client'

import { Company } from '@prisma/client'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface DashboardContext {
  selectedCompany: Pick<Company, 'id' | 'name' | 'pro'> | null
  setSelectedCompany: Dispatch<SetStateAction<any>>
  // companies?: Pick<Company, "id" | "name" | "pro">[];
}

const DashboardContext = createContext<DashboardContext>({
  setSelectedCompany: () => {},
  selectedCompany: null,
  // companies: [],
})

interface IProps {
  children: ReactNode
  // companies?: Pick<Company, 'id' | 'name' | 'pro'>[]
}

function DashboardContextProvider({ children }: IProps) {
  const [selectedCompany, setSelectedCompany] = useState(null)

  return (
    <DashboardContext.Provider
      value={{
        selectedCompany,
        setSelectedCompany,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

function useDashboardContext() {
  const context = useContext(DashboardContext)

  if (context === undefined) {
    throw new Error(
      'useDashboardContext must be used within a DashboardContextProvider',
    )
  }

  return context
}

export { DashboardContextProvider, useDashboardContext }
