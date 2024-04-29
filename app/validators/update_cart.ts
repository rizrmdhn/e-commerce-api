import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const updateCartValidator = vine.compile(
  vine.object({
    quantity: vine.number(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'cart_id.required': 'Cart ID is required',
  'user_id.required': 'User ID is required',
  'product_id.required': 'Product ID is required',
  'quantity.required': 'Quantity is required',
  'price.required': 'Price is required',
  'product_id.exists': 'Product ID does not exist',
  'user_id.exists': 'User ID does not exist',
  'cart_id.exists': 'Cart ID does not exist',
  'quantity.integer': 'Quantity must be an integer',
  'price.integer': 'Price must be an integer',
  'price.numeric': 'Price must be a number',
  'quantity.numeric': 'Quantity must be a number',
  'quantity.min': 'Quantity must be at least 1',
  'quantity.max': 'Quantity must not be greater than 100',
})
