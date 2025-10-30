import { test, expect } from "@playwright/test"

test("complete multi-step form flow", async ({ page }) => {
  // 1. Access the application
  await page.goto("https://fm-multi-step-form-blush.vercel.app/")

  // 2. Step 1: Personal info
  await expect(page.getByText(/personal info/i)).toBeVisible()
  await page.getByLabel("Name").fill("test")
  await page.getByLabel("Email Address").fill("test@test.com")
  await page.getByLabel("Phone Number").fill("+55 (11)999999999")
  await page.getByRole("button", { name: /next/i }).click()

  // 3. Step 2: Plan Selection
  await expect(page.getByText(/select your plan/i)).toBeVisible()
  await page.getByText("Arcade").click()
  await page.getByRole("button", { name: /next/i }).click()

  // 4. Step 3: Add-ons
  await expect(page.getByText(/pick add-ons/i)).toBeVisible()
  await page.getByText("Larger storage").click()
  await page.getByText("Online service").click()
  await page.getByRole("button", { name: /next/i }).click()

  // 5. Step 4: Confirmation
  await expect(page.getByText(/Finishing up/i)).toBeVisible()
  await expect(page.getByText(/arcade/i)).toBeVisible()
  await expect(page.getByText(/online service/i)).toBeVisible()
  await expect(page.getByText(/larger storage/i)).toBeVisible()
  await page.getByRole("button", { name: /confirm/i }).click()

  // 6. Step 5: Thank you!
  await expect(page.getByTestId("thanks-title")).toBeVisible()
})

test("displays an error when attempting to proceed with irregular inputs", async ({
  page,
}) => {
  // 1. Access the application
  await page.goto("https://fm-multi-step-form-blush.vercel.app/")

  // test error 1: field not filled in
  await page.getByRole("button", { name: /next/i }).click()
  const required = await page.getByText(/this field is required/i).all()
  expect(required).toHaveLength(3)

  // test error 2: invalid inputs
  await page.getByLabel("Email Address").fill("test")
  await page.getByLabel("Phone Number").fill("123456test")
  await page.getByRole("button", { name: /next/i }).click()

  await expect(page.getByText(/invalid email/i)).toBeVisible()
  await expect(page.getByText(/enter only numbers/i)).toBeVisible()

  // test error 3: short phone number
  await page.getByLabel("Phone Number").fill("1234")
  await page.getByRole("button", { name: /next/i }).click()

  await expect(page.getByText(/very short phone number/i)).toBeVisible()
})

test("complete irregular multi-step form flow", async ({ page }) => {
  // 1. Access the application
  await page.goto("https://fm-multi-step-form-blush.vercel.app/")

  // 2. Personal info
  await expect(page.getByText(/personal info/i)).toBeVisible()
  await page.getByLabel("Name").fill("test")
  await page.getByLabel("Email Address").fill("test@test.com")
  await page.getByLabel("Phone Number").fill("+55 (11)999999999")
  await page.getByRole("button", { name: /next/i }).click()

  // 3. Plan Selection
  await expect(page.getByText(/select your plan/i)).toBeVisible()
  await page.getByText("Arcade").click()
  await page.getByRole("button", { name: /next/i }).click()

  // 4. Add-ons
  await expect(page.getByText(/pick add-ons/i)).toBeVisible()
  await page.getByText("Larger storage").click()
  await page.getByText("Online service").click()
  await page.getByRole("button", { name: /next/i }).click()

  // 5. Confirmation
  await expect(page.getByText(/Finishing up/i)).toBeVisible()
  await expect(page.getByText("Arcade (Monthly)")).toBeVisible()
  await expect(page.getByText(/online service/i)).toBeVisible()
  await expect(page.getByText(/larger storage/i)).toBeVisible()
  await page.getByRole("button", { name: /change/i }).click()

  // 6. test go back button
  await expect(page.getByText(/select your plan/i)).toBeVisible()
  await page.getByRole("button", { name: /back/i }).click()
  await expect(page.getByText(/personal info/i)).toBeVisible()
  await page.getByRole("button", { name: /next/i }).click()

  // 7. Change plan option
  await expect(page.getByText(/select your plan/i)).toBeVisible()
  await page.getByText("Advanced").click()
  await page.getByTestId("switch-billing").click()
  const discount = await page.getByText(/2 months free/i).all()
  expect(discount).toHaveLength(3)
  await page.getByRole("button", { name: /next/i }).click()

  // 8. Add-ons
  await expect(page.getByText(/pick add-ons/i)).toBeVisible()
  await page.getByText("Larger storage").click()
  await page.getByText("Online service").click()
  await page.getByText("Customizable profile").click()
  await page.getByRole("button", { name: /next/i }).click()

  // 9. Confirmation
  await expect(page.getByText(/Finishing up/i)).toBeVisible()
  await expect(page.getByText("Advanced (Yearly)")).toBeVisible()
  await expect(page.getByText(/customizable profile/i)).toBeVisible()
  await expect(page.getByText(/online service/i)).not.toBeVisible()
  await expect(page.getByText(/larger storage/i)).not.toBeVisible()
  await page.getByRole("button", { name: /confirm/i }).click()

  // 10. Step 5: Thank you!
  await expect(page.getByTestId("thanks-title")).toBeVisible()
})
