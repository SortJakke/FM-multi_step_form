import { FormProvider } from "../../context/FormContext"
import { render } from "@testing-library/react"

export const renderWithProvider = (ui: React.ReactElement) => {
  return render(<FormProvider>{ui}</FormProvider>)
}
