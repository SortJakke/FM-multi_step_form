import { useContext } from "react"
import { FormContext } from "./formState"

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context)
    throw new Error("useFormContext must be used inside the FormProvider")
  return context
}
