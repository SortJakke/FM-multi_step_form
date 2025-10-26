import { screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"

import StepConfirmation from "../components/StepConfirmation"
import { renderWithProvider } from "./utils/renderWithProvider"

describe("StepConfirmation", () => {
  it("must render the confirmation title", () => {
    renderWithProvider(<StepConfirmation />)
    expect(screen.getByText(/Finishing up/i)).toBeInTheDocument()
  })

  it('should render "Back" and "Confirm" buttons', () => {
    renderWithProvider(<StepConfirmation />)
    expect(screen.getByRole("button", { name: /Go Back/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Confirm/i })).toBeInTheDocument()
  })
})
