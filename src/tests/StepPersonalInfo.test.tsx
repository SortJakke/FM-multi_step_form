import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"

import StepPersonalInfo from "../components/StepPersonalInfo"

describe("StepPersonalInfo", () => {
  it("should render the name, email and phone inputs", () => {
    render(<StepPersonalInfo />)
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument()
  })

  it('should render the "Next" button', () => {
    render(<StepPersonalInfo />)
    expect(
      screen.getByRole("button", { name: /Next Step/i })
    ).toBeInTheDocument()
  })
})
