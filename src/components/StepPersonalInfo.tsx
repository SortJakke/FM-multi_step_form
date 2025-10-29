import { useFormContext } from "../context/useFormContext"
import { useForm } from "react-hook-form"

import type { SubmitErrorHandler } from "react-hook-form"

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
    setFocus,
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

  const onError: SubmitErrorHandler<PersonalInfoFormData> = (formErrors) => {
    const firstKey = Object.keys(formErrors)[0]
    if (firstKey) setFocus(firstKey as keyof PersonalInfoFormData)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="w-full h-full md:w-lg flex flex-col justify-between gap-4 md:p-6 text-blue-950"
    >
      {Object.keys(errors).length > 0 && (
        <div
          id="form-error-summary"
          role="alert"
          aria-live="assertive"
          className="sr-only"
        >
          {`There ${Object.keys(errors).length === 1 ? "is" : "are"} ${
            Object.keys(errors).length
          } error${Object.keys(errors).length === 1 ? "" : "s"}`}
        </div>
      )}

      <div className="flex flex-col gap-6 rounded-md bg-white px-6 py-8 md:p-0">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Personal info</h1>
          <p className="text-gray-500">
            Please provide your name, email address, and phone number.
          </p>
        </div>
        <div className="space-y-4">
          <label className="flex flex-col gap-2 text-sm" htmlFor="name">
            <div className="flex justify-between items-center">
              Name
              {errors.name && (
                <span
                  id="name-error"
                  role="alert"
                  aria-live="assertive"
                  className="text-red-500 text-xs font-semibold"
                >
                  {errors.name.message}
                </span>
              )}
            </div>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-required="true"
              {...register("name", { required: "This field is required" })}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`placeholder-gray-400 font-medium border border-gray-400 py-3 px-4 rounded hover:border-purple-600 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="e.g. Stephen King"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm" htmlFor="email">
            <div className="flex justify-between items-center">
              Email Address
              {errors.email && (
                <span
                  id="email-error"
                  role="alert"
                  aria-live="assertive"
                  className="text-red-500 text-xs font-semibold"
                >
                  {errors.email.message}
                </span>
              )}
            </div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-required="true"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`placeholder-gray-400 font-medium border border-gray-400 py-3 px-4 rounded hover:border-purple-600 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="e.g. Stephenking@lorem.com"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm" htmlFor="phone">
            <div className="flex justify-between items-center">
              Phone Number
              {errors.phone && (
                <span
                  id="phone-error"
                  role="alert"
                  aria-live="assertive"
                  className="text-red-500 text-xs font-semibold"
                >
                  {errors.phone.message}
                </span>
              )}
            </div>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              aria-required="true"
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
              aria-describedby={errors.phone ? "phone-error" : undefined}
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
