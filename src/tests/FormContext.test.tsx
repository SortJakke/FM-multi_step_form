import { render, screen } from "@testing-library/react"
import { FormProvider } from "../context/FormContext"
import { useFormContext } from "../context/useFormContext"

import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import { describe, it, expect } from "vitest"

const TestComponent = () => {
  const { formData, setFormData, currentStep, nextStep } = useFormContext()

  return (
    <>
      <p>Name: {formData.name}</p>
      <p>Step: {currentStep}</p>
      <button type="button" onClick={() => setFormData({ name: "Test User" })}>
        Confirm
      </button>
      <button type="button" onClick={nextStep}>
        Next
      </button>
    </>
  )
}

describe("FormContext", () => {
  it("deve atualizar o nome e avançar etapa", async () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    )

    expect(screen.getByText(/name:/i)).toHaveTextContent("Name:")
    expect(screen.getByText(/step:/i)).toHaveTextContent("Step: 0")

    const confirmButton = screen.getByText("Confirm")
    const nextButton = screen.getByText("Next")

    await userEvent.click(confirmButton)
    await userEvent.click(nextButton)
    expect(screen.getByText(/name:/i)).toHaveTextContent("Name: Test User")
    expect(screen.getByText(/step:/i)).toHaveTextContent("Step: 1")
  })
})
