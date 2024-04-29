import User from '#models/user'
import { storeUserValidator } from '#validators/store_user'
import type { HttpContext } from '@adonisjs/core/http'
import * as nanoid from 'nanoid'

export default class UsersController {
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { email, fullName, password } = await request.validateUsing(storeUserValidator)

    await User.create({
      id: `user_${nanoid.nanoid(16)}`,
      email,
      fullName,
      password,
    })

    return response.created({
      meta: {
        status: 201,
        message: 'Success',
      },
    })
  }
}
