import { useFormContext } from "../context/useFormContext"
import { useEffect } from "react"
import type { Billing } from "../types/context"

const availableAddOns = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    priceMonthly: 1,
    priceYearly: 10,
  },
  {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    priceMonthly: 2,
    priceYearly: 20,
  },
  {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    priceMonthly: 2,
    priceYearly: 20,
  },
]

const getPrice = (name: string, billing: Billing) => {
  const addOn = availableAddOns.find((a) => a.name === name)
  return billing === "monthly"
    ? addOn?.priceMonthly ?? 0
    : addOn?.priceYearly ?? 0
}

function StepAddOns() {
  const { formData, setFormData, nextStep, prevStep } = useFormContext()

  const toggleAddOn = (name: string) => {
    const exists = formData.addOns.find((addOn) => addOn.name === name)
    if (exists) {
      setFormData({
        addOns: formData.addOns.filter((addOn) => addOn.name !== name),
      })
    } else {
      const price = getPrice(name, formData.billing)
      setFormData({
        addOns: [...formData.addOns, { name, price }],
      })
    }
  }

  useEffect(() => {
    const updatedAddOns = formData.addOns.map((addOn) => ({
      name: addOn.name,
      price: getPrice(addOn.name, formData.billing),
    }))
    setFormData({ addOns: updatedAddOns })
  }, [formData.billing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full md:w-lg flex flex-col justify-between gap-4 md:p-6 text-blue-950"
    >
      <div className="flex flex-col gap-10 rounded-md bg-white px-6 py-8 md:p-0">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Pick add-ons</h1>
          <p className="text-gray-500">
            Add-ons help enhance your gaming experience.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {availableAddOns.map((addOn) => {
            const isChecked = formData.addOns.some((a) => a.name === addOn.name)
            const price = getPrice(addOn.name, formData.billing)
            const idBase = `addon-${addOn.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`

            return (
              <label
                key={addOn.name}
                className={`flex items-center justify-between border p-3 rounded-lg cursor-pointer hover:border-purple-600 ${
                  isChecked ? "border-blue-950 bg-blue-100" : "border-gray-500"
                }`}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault()
                    toggleAddOn(addOn.name)
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <input
                    id={idBase}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleAddOn(addOn.name)}
                    className="sr-only peer"
                    aria-describedby={`${idBase}-desc ${idBase}-price`}
                  />
                  <div className="w-5 h-5 bg-blue-50 rounded border border-gray-500 peer-focus:ring peer-focus:ring-blue-500 peer-checked:bg-purple-600 peer-checked:border-transparent flex items-end justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-blue-50"
                      aria-hidden="true"
                      focusable="false"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.17 9.17-4.242-4.243a1 1 0 0 0-1.414 1.414l4.949 4.95a1 1 0 0 0 1.414 0l9.877-9.873z" />
                    </svg>
                  </div>
                  <div>
                    <p id={`${idBase}-label`} className="font-medium">
                      {addOn.name}
                    </p>
                    <p id={`${idBase}-desc`} className="text-xs text-gray-500">
                      {addOn.description}
                    </p>
                  </div>
                </div>
                <span
                  id={`${idBase}-price`}
                  className="text-sm text-purple-600"
                >
                  +${price}/{formData.billing === "monthly" ? "mo" : "yr"}
                </span>
              </label>
            )
          })}
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
          className="w-32 bg-blue-950 text-white py-3 rounded cursor-pointer hover:bg-purple-600"
        >
          Next Step
        </button>
      </div>
    </form>
  )
}

export default StepAddOns
