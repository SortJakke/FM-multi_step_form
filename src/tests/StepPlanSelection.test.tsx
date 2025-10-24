import { screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"

import StepPlanSelection from "../components/StepPlanSelection"
import { renderWithProvider } from "./utils/renderWithProvider"

describe("StepPlanSelection", () => {
  it("should render the plan options: Arcade, Advanced and Pro", () => {
    renderWithProvider(<StepPlanSelection />)
    expect(screen.getByText(/arcade/i)).toBeInTheDocument()
    expect(screen.getByText(/advanced/i)).toBeInTheDocument()
    expect(screen.getByText(/pro/i)).toBeInTheDocument()
  })

  it("should render monthly/annual billing switch", () => {
    renderWithProvider(<StepPlanSelection />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByTestId("billing-monthly")).toBeInTheDocument()
    expect(screen.getByTestId("billing-yearly")).toBeInTheDocument()
  })

  it('should render "Back" and "Next" buttons', () => {
    renderWithProvider(<StepPlanSelection />)
    expect(screen.getByRole("button", { name: /Go Back/i })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /Next Step/i })
    ).toBeInTheDocument()
  })
})
