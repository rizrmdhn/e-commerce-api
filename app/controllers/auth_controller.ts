import User from '#models/user'
import { loginValidator } from '#validators/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Display form to create a new record
   */
  async create({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await auth.use('jwt').generate(user)

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: token,
    })
  }
}
