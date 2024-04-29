import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().minLength(3).maxLength(255),
    password: vine.string().minLength(8).maxLength(255),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'email.required': 'Email is required',
  'email.email': 'Email must be a valid email address',
  'email.minLength': 'Email must be at least 3 characters',
  'email.maxLength': 'Email must not exceed 255 characters',
  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least 8 characters',
  'password.maxLength': 'Password must not exceed 255 characters',
})
