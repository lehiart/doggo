import { Category, Company } from '@prisma/client'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type CompanyWithCategories = Company & { categories: Category[] }

interface IFormContext {
  formData: any
  setFormData: Dispatch<SetStateAction<any>>
  onHandleBack: () => void
  onHandleNext: () => void
  step: number
  type: 'EDIT' | 'NEW'
  id: string | undefined
  company: CompanyWithCategories | undefined
}

const FormContext = createContext<IFormContext>({
  formData: {},
  onHandleBack: () => {},
  onHandleNext: () => {},
  setFormData: () => {},
  step: 0,
  type: 'NEW',
  id: '',
  company: undefined,
})

interface IProps {
  children: ReactNode
  id: string
  type: 'EDIT' | 'NEW'
  company: CompanyWithCategories | undefined
}

export function FormProvider({ children, id, type, company }: IProps) {
  const [formData, setFormData] = useState()
  const [step, setStep] = useState(1)

  function onHandleNext() {
    setStep((prev) => prev + 1)
  }

  function onHandleBack() {
    setStep((prev) => prev - 1)
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        onHandleBack,
        onHandleNext,
        step,
        type,
        id,
        company,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormState() {
  return useContext(FormContext)
}
