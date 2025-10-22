import {createContext } from "react"
import type { FormData } from "../types/context"

export interface FormContextType {
  formData: FormData
  setFormData: (data: Partial<FormData>) => void
  currentStep: number
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
}

export const defaultData: FormData = {
  name: "",
  email: "",
  phone: "",
  plan: "Arcade",
  billing: "monthly",
  addOns: [],
}

export const FormContext = createContext<FormContextType | undefined>(undefined)