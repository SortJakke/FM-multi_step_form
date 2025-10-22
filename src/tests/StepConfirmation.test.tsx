import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"

import StepConfirmation from "../components/StepConfirmation"

describe("StepConfirmation", () => {
  it("must render the confirmation title", () => {
    render(<StepConfirmation />)
    expect(screen.getByText(/Finishin up/i)).toBeInTheDocument()
  })

  it('should render "Back" and "Confirm" buttons', () => {
    render(<StepConfirmation />)
    expect(screen.getByRole("button", { name: /Go Back/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Confirm/i })).toBeInTheDocument()
  })
})
