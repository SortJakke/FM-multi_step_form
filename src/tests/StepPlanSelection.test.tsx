import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"

import StepPlanSelection from "../components/StepPlanSelection"

describe("StepPlanSelection", () => {
  it("should render the plan options: Arcade, Advanced and Pro", () => {
    render(<StepPlanSelection />)
    expect(screen.getByText(/arcade/i)).toBeInTheDocument()
    expect(screen.getByText(/advanced/i)).toBeInTheDocument()
    expect(screen.getByText(/pro/i)).toBeInTheDocument()
  })

  it("should render monthly/annual billing switch", () => {
    render(<StepPlanSelection />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
    expect(screen.getByText(/monthly/i)).toBeInTheDocument()
    expect(screen.getByText(/Yearly/i)).toBeInTheDocument()
  })

  it('should render "Back" and "Next" buttons', () => {
    render(<StepPlanSelection />)
    expect(screen.getByRole("button", { name: /Go Back/i })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /Next Step/i })
    ).toBeInTheDocument()
  })
})
