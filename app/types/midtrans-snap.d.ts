export type MidtransSnap = {
  transaction_details: TransactionDetails
  credit_card: CreditCard
  item_details: ItemDetail[]
  customer_details: CustomerDetails
}

export type CreditCard = {
  secure: boolean
}

export type CustomerDetails = {
  first_name: string
  last_name: string
  email: string
  phone: string
  billing_address: BillingAddress
  shipping_address: BillingAddress
}

export type BillingAddress = {
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  city: string
  postal_code: string
  country_code: string
}

export type ItemDetail = {
  id: string
  price: string
  quantity: string
  name: string
}

export type TransactionDetails = {
  order_id: string
  gross_amount: string
}
