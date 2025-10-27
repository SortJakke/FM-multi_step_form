import { useFormContext } from "../context/useFormContext"
import StepPersonalInfo from "../components/StepPersonalInfo"
import StepPlanSelection from "../components/StepPlanSelection"
import StepAddOns from "../components/StepAddOns"
import StepConfirmation from "../components/StepConfirmation"
import StepThanks from "../components/StepThanks"

function MultiStepForm() {
  const { currentStep } = useFormContext()

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepPersonalInfo/>
      case 1:
        return <StepPlanSelection/>
      case 2:
        return <StepAddOns/>
      case 3:
        return <StepConfirmation/>
      case 4:
        return <StepThanks/>
      default:
        return <div>Unknown Step</div>
    }
  }

  const stepTitles = ["Your Info", "Select Plan", "Add-Ons", "Summary"]

  return (
    <div className="w-full p-4 bg-purple-600 grid gap-4">
      <div className="w-fit p-4 mx-auto text-blue-100 flex items-center gap-4">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            aria-label={title}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold border ${
              currentStep === index
                ? " border-blue-200 bg-blue-200 text-blue-950"
                : " bg-purple-600"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      {renderStep()}
    </div>
  )
}

export default MultiStepForm
