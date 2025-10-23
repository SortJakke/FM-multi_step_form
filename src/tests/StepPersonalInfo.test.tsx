import { screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"

import StepPersonalInfo from "../components/StepPersonalInfo"
import { renderWithProvider } from "./utils/renderWithProvider"

describe("StepPersonalInfo", () => {
  it("should render the name, email and phone inputs", () => {
    renderWithProvider(<StepPersonalInfo />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
  })

  it('should render the "Next" button', () => {
    renderWithProvider(<StepPersonalInfo />)
    expect(
      screen.getByRole("button", { name: /Next Step/i })
    ).toBeInTheDocument()
  })
})
