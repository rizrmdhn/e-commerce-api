import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const storeCartValidator = vine.compile(
  vine.object({
    productId: vine
      .string()
      .maxLength(255)
      .exists(async (db, value) => {
        const product = await db.from('products').where('product_id', value).first()
        return product
      }),
    quantity: vine.number(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'cart_id.required': 'Cart ID is required',
  'user_id.required': 'User ID is required',
  'product_id.required': 'Product ID is required',
  'quantity.required': 'Quantity is required',
  'title.required': 'Title is required',
  'title.minLength': 'Title must be at least 3 characters',
  'title.maxLength': 'Title must not be greater than 255 characters',
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
