"use client";

import { Company } from "@prisma/client";
import DetailsStepForm from "./details-step-form";
import AddressStepForm from "./address-step-form";
import ContactStepForm from "./contact-step-form";
import {
  FormProvider,
  useFormState,
} from "@/app/dashboard/components/company-form-context";

interface MemberFormProps {
  id: string | undefined;
  type: "EDIT" | "NEW";
  company?: Company | undefined;
}

function FormHeader() {
  const { step } = useFormState();

  if (step > 3) return null;

  return (
    <h1 className="py-4 text-center text-2xl font-semibold">
      Sign Up Form {step}/3
    </h1>
  );
}

export default function CompanyForm({ id, type, company }: MemberFormProps) {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormProvider>
        <div className="w-full max-w-2xl rounded-xl  border  bg-white p-6">
          <FormHeader />

          <div className="space-y-6">
            <ActiveStepFormComponent />
          </div>
        </div>
      </FormProvider>
    </main>
  );
}
