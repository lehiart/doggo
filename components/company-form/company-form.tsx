'use client'

import { Category, Company } from '@prisma/client'

import { FormProvider } from './company-form-context'
import CompanyFormHeader from '@/components/company-form/company-form-header'
import ActiveStepFormComponent from './company-form-stepper'

type CompanyWithCategories = Company & { categories: Category[] }

interface MemberFormProps {
  id: string
  type: 'EDIT' | 'NEW'
  company?: CompanyWithCategories | undefined
}

export default function CompanyForm({ id, type, company }: MemberFormProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormProvider id={id} type={type} company={company}>
        <div className="w-full rounded-xl border p-6">
          <CompanyFormHeader />

          <div className="space-y-6">
            <ActiveStepFormComponent />
          </div>
        </div>
      </FormProvider>
    </main>
  )
}
