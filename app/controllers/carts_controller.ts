import Cart from '#models/cart'
import { storeCartValidator } from '#validators/store_cart'
import { updateCartValidator } from '#validators/update_cart'
import type { HttpContext } from '@adonisjs/core/http'
import * as nanoid from 'nanoid'

export default class CartsController {
  /**
   * Display a list of resource
   */
  async index({ response, auth }: HttpContext) {
    const user = auth.use('jwt').user?.id

    if (!user) {
      return response.unauthorized({
        meta: {
          status: 401,
          message: 'Unauthorized',
        },
      })
    }

    const carts = await Cart.query().where('user_id', user).preload('product')

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: carts,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const user = auth.use('jwt').user?.id

    if (!user) {
      return response.unauthorized({
        meta: {
          status: 401,
          message: 'Unauthorized',
        },
      })
    }

    const { productId, quantity } = await request.validateUsing(storeCartValidator)

    const oldProduct = await Cart.query()
      .where('user_id', user)
      .where('product_id', productId)
      .first()

    if (oldProduct) {
      oldProduct.quantity = oldProduct.quantity + quantity
      await oldProduct.save()
      return response.ok({
        meta: {
          status: 200,
          message: 'Success',
        },
        data: oldProduct,
      })
    }

    const cart = await Cart.create({
      cart_id: `cart_${nanoid.nanoid(16)}`,
      user_id: user,
      product_id: productId,
      quantity,
    })

    return response.created({
      meta: {
        status: 201,
        message: 'Success',
      },
      data: cart,
    })
  }

  /**
   * Edit individual record
   */
  async edit({ auth, params, request, response }: HttpContext) {
    const user = auth.use('jwt').user?.id

    if (!user) {
      return response.unauthorized({
        meta: {
          status: 401,
          message: 'Unauthorized',
        },
      })
    }

    const { quantity } = await request.validateUsing(updateCartValidator)

    const cart = await Cart.query().where('user_id', user).where('cart_id', params.cartId).first()

    if (!cart) {
      return response.notFound({
        meta: {
          status: 404,
          message: 'Cart not found',
        },
      })
    }

    cart.quantity = quantity
    await cart.save()

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: cart,
    })
  }

  /**
   * Delete record
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.use('jwt').user?.id

    if (!user) {
      return response.unauthorized({
        meta: {
          status: 401,
          message: 'Unauthorized',
        },
      })
    }

    const cart = await Cart.query().where('user_id', user).where('cart_id', params.cartId).first()

    if (!cart) {
      return response.notFound({
        meta: {
          status: 404,
          message: 'Cart not found',
        },
      })
    }

    await cart.delete()

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
    })
  }
}
