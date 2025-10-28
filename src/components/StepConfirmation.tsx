import { useFormContext } from "../context/useFormContext"

const availablePlans = {
  Arcade: { name: "Arcade", monthly: 9, yearly: 90 },
  Advanced: { name: "Advanced", monthly: 12, yearly: 120 },
  Pro: { name: "Pro", monthly: 15, yearly: 150 },
}

function StepConfirmation() {
  const { formData, prevStep, changeStep, nextStep } = useFormContext()

  const planPrice =
    formData.billing === "monthly"
      ? availablePlans[formData.plan].monthly
      : availablePlans[formData.plan].yearly

  const totalAddOns = formData.addOns.reduce(
    (sum, addOn) => sum + addOn.price,
    0
  )
  const total = planPrice + totalAddOns

  return (
    <div className="h-full md:w-lg flex flex-col justify-between gap-4 md:p-6 text-blue-950">
      <div className="flex flex-col gap-10 rounded-md bg-white px-6 py-8 md:p-0">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">Finishing up</h2>
          <p className="text-gray-500">
            Double-check everything looks OK before confirming.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="p-6 bg-blue-50 rounded-lg divide-y divide-blue-100">
            <div className="flex items-center justify-between mb-2 pb-4">
              <div>
                <p className="font-medium">
                  {formData.plan} (
                  {formData.billing === "monthly" ? "Monthly" : "Yearly"})
                </p>
                <button
                  type="button"
                  onClick={() => {
                    changeStep(2)
                  }}
                  className="text-sm text-gray-500 underline cursor-pointer hover:text-purple-600"
                >
                  Change
                </button>
              </div>
              <p className="font-semibold">
                ${planPrice}/{formData.billing === "monthly" ? "mo" : "yr"}
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              {formData.addOns.map((addOn) => (
                <div
                  key={addOn.name}
                  className="flex justify-between text-sm mb-1"
                >
                  <p className="text-gray-500">{addOn.name}</p>
                  <p>
                    +${addOn.price}/
                    {formData.billing === "monthly" ? "mo" : "yr"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 flex justify-between items-center mt-4">
            <p className="text-gray-500">
              Total (per {formData.billing === "monthly" ? "month" : "year"})
            </p>
            <p className="text-xl font-bold text-purple-600">
              +${total}/{formData.billing === "monthly" ? "mo" : "yr"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={prevStep}
          className="font-medium text-gray-500 px-4 py-2 rounded cursor-pointer hover:text-blue-950"
        >
          Go Back
        </button>
        <button
          type="submit"
          onClick={nextStep}
          className="w-32 bg-purple-600 text-white py-3 rounded cursor-pointer hover:opacity-50"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default StepConfirmation
