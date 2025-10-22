export type Plan = "Arcade" | "Advanced" | "Pro"
export type Billing = "monthly" | "yearly"

export interface AddOn {
  name: string
  price: number
}

export interface FormData {
  name: string
  email: string
  phone: string
  plan: Plan
  billing: Billing
  addOns: AddOn[]
}
