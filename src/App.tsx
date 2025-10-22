import { FormProvider } from "./context/FormContext"
import MultiStepForm from "./pages/MultiStepForm"

function App() {
  return (
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  )
}

export default App
