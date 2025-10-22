import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"

import StepAddOns from "../components/StepAddOns"

describe("StepAddOns", () => {
  it("should render the add-on options", () => {
    render(<StepAddOns />)
    expect(screen.getByLabelText(/online service/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/larger storage/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/customizable profile/i)).toBeInTheDocument()
  })

  it('should render "Back" and "Next" buttons', () => {
    render(<StepAddOns />)
    expect(screen.getByRole("button", { name: /Go Back/i })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /Next Step/i })
    ).toBeInTheDocument()
  })
})
