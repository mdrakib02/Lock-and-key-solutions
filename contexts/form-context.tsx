"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface FormData {
  email: string
  name: string
  phone: string
  zipCode: string
  location: string
  timing: string
  projectDetails: string
}

interface FormContextType {
  formData: FormData
  currentStep: number
  setFormData: (data: Partial<FormData>) => void
  setCurrentStep: (step: number) => void
  goNext: () => void
  goPrev: () => void
  resetData: (field: keyof FormData) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormDataState] = useState<FormData>({
    email: "",
    name: "",
    phone: "",
    zipCode: "",
    location: "",
    timing: "",
    projectDetails: "",
  })

  console.log(formData)

  const [currentStep, setCurrentStep] = useState(0)

  const setFormData = (data: Partial<FormData>) => {
    setFormDataState((prev) => ({ ...prev, ...data }))
  }

  const goNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6))
  }

  const goPrev = () => {
    setCurrentStep((prev) => {
      const newStep = Math.max(prev - 1, 0)
      if (prev === 1) resetData("email")
      if (prev === 2) resetData("name")
      if (prev === 3) resetData("phone")
      if (prev === 4) resetData("zipCode")
      if (prev === 5) resetData("timing")
      if (prev === 6) resetData("projectDetails")
      return newStep
    })
  }

  const resetData = (field: keyof FormData) => {
    setFormDataState((prev) => ({ ...prev, [field]: "" }))
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        setFormData,
        setCurrentStep,
        goNext,
        goPrev,
        resetData,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider")
  }
  return context
}
