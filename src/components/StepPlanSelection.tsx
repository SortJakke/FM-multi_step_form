import { useFormContext } from "../context/useFormContext"
import arcade from "../assets/icon-arcade.svg"
import advanced from "../assets/icon-advanced.svg"
import pro from "../assets/icon-pro.svg"

const plans = [
  { name: "Arcade", monthlyPrice: 9, yearlyPrice: 90 },
  { name: "Advanced", monthlyPrice: 12, yearlyPrice: 120 },
  { name: "Pro", monthlyPrice: 15, yearlyPrice: 150 },
]

function StepPlanSelection() {
  const { formData, setFormData, nextStep, prevStep } = useFormContext()

  const handlePlanSelect = (planName: string) => {
    setFormData({ plan: planName as typeof formData.plan })
  }

  const toggleBilling = () => {
    setFormData({
      billing: formData.billing === "monthly" ? "yearly" : "monthly",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-blue-950">
      <div className="flex flex-col gap-4 rounded-md bg-white p-6">
        <h2 className="text-xl font-bold">Select your plan</h2>
        <p className="text-gray-500">
          You have the option of monthly or yearly billing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const isSelected = formData.plan === plan.name

            return (
              <button
                key={plan.name}
                type="button"
                onClick={() => handlePlanSelect(plan.name)}
                className={`flex gap-4 border-2 p-4 rounded ${
                  isSelected ? "border-blue-950 bg-blue-100" : "border-blue-100"
                }`}
              >
                <img
                  src={
                    plan.name === "Arcade"
                      ? arcade
                      : plan.name === "Advanced"
                      ? advanced
                      : pro
                  }
                  alt={`${plan.name} icon`}
                  className="mb-4"
                />
                <div className="text-start">
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formData.billing === "monthly"
                      ? `$${plan.monthlyPrice}/mo`
                      : `$${plan.yearlyPrice}/yr`}
                  </p>
                  <p className="text-sm">
                    {formData.billing === "yearly" ? "2 months free" : ""}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-4">
          <span
            data-testid="billing-monthly"
            className={`font-medium ${
              formData.billing === "monthly" ? "text-grey-500" : ""
            }`}
          >
            Monthly
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              role="switch"
              className="sr-only peer"
              checked={formData.billing === "yearly"}
              onChange={toggleBilling}
              aria-label="Toggle billing period"
              title="Toggle billing period"
            />
            <div className="w-11 h-6 bg-blue-950 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black peer peer-checked:bg-blue-950 transition-all"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full"></div>
          </label>
          <span
            data-testid="billing-yearly"
            className={`font-medium ${
              formData.billing === "yearly" ? "text-grey-500" : ""
            }`}
          >
            Yearly
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={prevStep}
          className="font-medium text-gray-500 px-4 py-2 rounded"
        >
          Go Back
        </button>
        <button
          type="submit"
          className="bg-blue-950 text-white px-4 py-2 rounded"
        >
          Next Step
        </button>
      </div>
    </form>
  )
}

export default StepPlanSelection
