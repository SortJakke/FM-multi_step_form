import { useFormContext } from "../context/useFormContext"
import { useForm } from "react-hook-form"

type PersonalInfoFormData = {
  name: string
  email: string
  phone: string
}

function StepPersonalInfo() {
  const { formData, setFormData, nextStep } = useFormContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    defaultValues: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
  })

  const onSubmit = (e: PersonalInfoFormData) => {
    setFormData(e)
    nextStep()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full md:w-lg flex flex-col justify-between gap-4 md:p-6 text-blue-950"
    >
      <div className="flex flex-col gap-6 rounded-md bg-white px-6 py-8 md:p-0">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Personal info</h1>
          <p className="text-gray-500">
            Please provide your name, email address, and phone number.
          </p>
        </div>
        <div className="space-y-4">
          <label className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between items-center">
              Name
              {errors.name && (
                <span className="text-red-500 text-xs font-semibold">
                  {errors.name.message}
                </span>
              )}
            </div>
            <input
              type="text"
              {...register("name", { required: "This field is required" })}
              className={`placeholder-gray-400 font-medium border border-gray-400 py-3 px-4 rounded hover:border-purple-600 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="e.g. Stephen King"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between items-center">
              Email Address
              {errors.email && (
                <span className="text-red-500 text-xs font-semibold">
                  {errors.email.message}
                </span>
              )}
            </div>
            <input
              type="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              className={`placeholder-gray-400 font-medium border border-gray-400 py-3 px-4 rounded hover:border-purple-600 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="e.g. Stephenking@lorem.com"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between items-center">
              Phone Number
              {errors.phone && (
                <span className="text-red-500 text-xs font-semibold">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <input
              type="tel"
              {...register("phone", {
                required: "This field is required",
                pattern: {
                  value: /^[\d\s()+-]+$/,
                  message: "Enter only numbers",
                },
                minLength: {
                  value: 8,
                  message: "Very short phone number",
                },
              })}
              className={`placeholder-gray-400 font-medium border border-gray-400 py-3 px-4 rounded hover:border-purple-600 ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="e.g. +1 234 567 890"
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-32 bg-blue-950 text-white py-3 rounded self-end cursor-pointer hover:bg-purple-600"
      >
        Next Step
      </button>
    </form>
  )
}

export default StepPersonalInfo
