import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createBuyValidator = vine.compile(
  vine.object({
    product_id: vine.string(),
    quantity: vine.number(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'product_id.required': 'Product ID is required',
  'quantity.required': 'Quantity is required',
})
