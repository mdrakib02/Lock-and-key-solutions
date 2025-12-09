"use client"

import { FormProvider } from "@/contexts/form-context"
import StepperForm from "@/components/stepper-form"

export default function Home() {
  return (
    <FormProvider>
      <StepperForm />
    </FormProvider>
  )
}