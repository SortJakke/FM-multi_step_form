import type { ReactNode } from "react"
import { useState } from "react"
import { FormContext, defaultData } from "./formState"
import type { FormContextType } from "./formState"
import type { FormData } from "../types/context"

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState<FormData>(defaultData)
  const [currentStep, setCurrentStep] = useState(0)

  const setFormData: FormContextType["setFormData"] = (data) => {
    setFormDataState((prev) => ({ ...prev, ...data }))
  }

  const goToStep: FormContextType["goToStep"] = (step) => setCurrentStep(step)
  const nextStep: FormContextType["nextStep"] = () =>
    setCurrentStep((prev) => prev + 1)
  const prevStep: FormContextType["prevStep"] = () =>
    setCurrentStep((prev) => prev - 1)
  const changeStep: FormContextType["changeStep"] = (n: number) =>
    setCurrentStep((prev) => prev - n)

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        currentStep,
        goToStep,
        nextStep,
        prevStep,
        changeStep,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
