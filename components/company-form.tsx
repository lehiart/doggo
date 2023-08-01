"use client";

import { Company } from "@prisma/client";
import DetailsStepForm from "./details-step-form";
import AddressStepForm from "./address-step-form";
import ContactStepForm from "./contact-step-form";
import {
  FormProvider,
  useFormState,
} from "@/app/dashboard/components/company-form-context";
import CompanyFormHeader from "@/components/company-form-header";

interface MemberFormProps {
  id: string;
  type: "EDIT" | "NEW";
  company?: Company | undefined;
}

const ActiveStepFormComponent = () => {
  const { step } = useFormState();

  switch (step) {
    case 1:
      return <DetailsStepForm />;
    case 2:
      return <AddressStepForm />;
    case 3:
      return <ContactStepForm />;
    default:
      return null;
  }
};

export default function CompanyForm({ id, type, company }: MemberFormProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormProvider id={id} type={type}>
        <div className="w-full rounded-xl border p-6">
          <CompanyFormHeader />

          <div className="space-y-6">
            <ActiveStepFormComponent />
          </div>
        </div>
      </FormProvider>
    </main>
  );
}
