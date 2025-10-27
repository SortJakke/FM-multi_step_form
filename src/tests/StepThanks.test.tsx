import { screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"

import StepThanks from "../components/StepThanks"

import { renderWithProvider } from "./utils/renderWithProvider"

describe("StepThanks", () => {
  it("must render the thank you title", () => {
    renderWithProvider(<StepThanks />)
    expect(screen.getByText("Thank You!")).toBeInTheDocument()
  })
})
