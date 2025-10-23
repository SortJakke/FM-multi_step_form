import { useFormContext } from "../context/useFormContext"

function StepPersonalInfo() {
  const { formData, setFormData, nextStep } = useFormContext()

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ [field]: e.target.value })
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full flex flex-col justify-between gap-4 text-blue-950"
    >
      <div className="flex flex-col gap-4 rounded-md bg-white p-6">
        <h2 className="text-2xl font-bold">Personal info</h2>
        <p className="text-gray-500">
          Please provide your name, email address, and phone number.
        </p>
        <label className="flex flex-col text-sm">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange("name")}
            required
            className="placeholder-gray-400 placeholder:font-medium border border-gray-400 py-2 px-4 rounded"
            placeholder="e.g. Stephen King"
          />
        </label>

        <label className="flex flex-col text-sm">
          Email Address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            required
            className="placeholder-gray-400 placeholder:font-medium border border-gray-400 py-2 px-4 rounded"
            placeholder="e.g. Stephenking@lorem.com"
          />
        </label>

        <label className="flex flex-col text-sm">
          Phone Number
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            required
            className="placeholder-gray-400 placeholder:font-medium border border-gray-400 py-2 px-4 rounded"
            placeholder="e.g. +1 234 567 890"
          />
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-950 text-white font-medium py-2 px-4 rounded self-end"
      >
        Next Step
      </button>
    </form>
  )
}

export default StepPersonalInfo
