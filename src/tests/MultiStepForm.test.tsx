import { screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"

import MultiStepForm from "../pages/MultiStepForm"
import { renderWithProvider } from "./utils/renderWithProvider"

describe("MultiStepForm integration", () => {
  it("It allows you to fill in your details and navigate to confirmation.", async () => {
    renderWithProvider(<MultiStepForm />)

    // Step 1: Personal Information
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test" },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@email.com" },
    })
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "+55 (11)999999999" },
    })
    fireEvent.click(screen.getByRole("button", { name: /next step/i }))

    // Step 2: Plan selection
    await screen.findByText(/select your plan/i)
    fireEvent.click(screen.getByText(/arcade/i))
    fireEvent.click(screen.getByRole("button", { name: /next step/i }))

    // Step 3: Add-ons
    await screen.findByText(/pick add-ons/i)
    fireEvent.click(screen.getByLabelText(/online service/i))
    fireEvent.click(screen.getByRole("button", { name: /next step/i }))

    // Step 4: Confirmation
    await screen.findByText(/finishing up/i)
    expect(screen.getByText(/finishing up/i)).toBeInTheDocument()
    expect(screen.getByText(/arcade/i)).toBeInTheDocument()
    expect(screen.getByText(/online service/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }))

    // Step 5: Thank you
    await screen.findByTestId("thanks-title")
    expect(screen.getByTestId("thanks-title")).toBeInTheDocument()
  })
})
