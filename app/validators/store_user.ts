import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const storeUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3).maxLength(255),
    email: vine.string().email().minLength(3).maxLength(255),
    password: vine.string().minLength(8).maxLength(255),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'fullName.required': 'Full Name is required',
  'fullName.minLength': 'Full Name must be at least 3 characters',
  'fullName.maxLength': 'Full Name must not exceed 255 characters',
  'email.required': 'Email is required',
  'email.email': 'Email must be a valid email address',
  'email.minLength': 'Email must be at least 3 characters',
  'email.maxLength': 'Email must not exceed 255 characters',
  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least 8 characters',
  'password.maxLength': 'Password must not exceed 255 characters',
})
