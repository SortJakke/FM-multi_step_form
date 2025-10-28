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
        return <StepPersonalInfo />
      case 1:
        return <StepPlanSelection />
      case 2:
        return <StepAddOns />
      case 3:
        return <StepConfirmation />
      case 4:
        return <StepThanks />
      default:
        return <div>Unknown Step</div>
    }
  }

  const stepTitles = ["Your Info", "Select Plan", "Add-Ons", "Summary"]

  return (
    <div className="w-full min-h-screen p-4 grid gap-4 relative md:w-240 md:min-h-auto md:h-150 md:mx-auto md:mt-16 md:flex md:bg-white rounded-lg">
      <div className="absolute top-0 left-0 p-6 w-full h-40 bg-cover bg-no-repeat bg-center bg-[url('assets/bg-sidebar-mobile.svg')] md:static md:w-72 md:h-full md:bg-[url('assets/bg-sidebar-desktop.svg')] md:rounded-lg">
        <div className="w-fit p-4 mx-auto text-blue-100 flex items-center gap-4 md:w-full md:flex-col md:gap-8">
          {stepTitles.map((title, index) => (
            <div key={index} className="w-full flex gap-4 items-center">
              <div
                aria-label={title}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold border md:w-10 md:h-10 md:border-2 ${
                  currentStep === index
                    ? " border-blue-200 bg-blue-200 text-blue-950"
                    : " bg-transparent"
                }`}
              >
                {index + 1}
              </div>
              <div className="hidden md:grid uppercase">
                <span className="text-blue-200 text-sm">Step {index + 1}</span>
                <span className="font-bold">{title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex-1 pt-24 z-10 md:pt-0 flex items-center justify-center">
        {renderStep()}
      </div>
    </div>
  )
}

export default MultiStepForm
