import { useFormState } from '@/components/company-form/company-form-context'
import AddressStepForm from '@/components/company-form/address-step-form'
import ContactStepForm from '@/components/company-form/contact-step-form'
import DetailsStepForm from '@/components/company-form/details-step-form'

const ActiveStepFormComponent = () => {
  const { step } = useFormState()

  switch (step) {
    case 1:
      return <DetailsStepForm />
    case 2:
      return <AddressStepForm />
    case 3:
      return <ContactStepForm />
    default:
      return null
  }
}

export default ActiveStepFormComponent
