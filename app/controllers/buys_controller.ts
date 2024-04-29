import Cart from '#models/cart'
import Order from '#models/order'
import type { HttpContext } from '@adonisjs/core/http'
import { ItemDetail } from '../types/midtrans-snap.js'
import User from '#models/user'
import * as nanoid from 'nanoid'
import Transaction from '#models/transaction'
import { DateTime } from 'luxon'
import app from '@adonisjs/core/services/app'

export default class BuysController {
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

    const orders = await Order.query().where('id', user).preload('product')

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: orders,
    })
  }

  async store({ response, auth }: HttpContext) {
    const user = auth.use('jwt').user?.id

    if (!user) {
      return response.unauthorized({
        meta: {
          status: 401,
          message: 'Unauthorized',
        },
      })
    }

    const userCart = await Cart.query().where('user_id', user).preload('product')

    let checkoutCart: Partial<ItemDetail>[] = []
    let costumerDetail = User.query().select('fullName', 'email').where('id', user).first()

    for await (const cart of userCart) {
      checkoutCart.push({
        id: cart.product_id,
        price: cart.product.price,
        quantity: cart.quantity.toString(),
      })
    }

    const transactionId = `order_${nanoid.nanoid(16)}`

    const snap = await app.container.make('MidtransSnap')

    const result = await snap.createTransaction({
      transaction_details: {
        order_id: transactionId,
        gross_amount: userCart.reduce(
          (a, b) => a + Number(b.product.price) * Number(b.quantity),
          0
        ),
      },
      item_details: [],
      customer_details: costumerDetail,
      page_expiry: {
        duration: 7,
        unit: 'hours',
      },
    })

    for await (const cart of userCart) {
      await Transaction.create({
        transaction_id: `transaction_${nanoid.nanoid(16)}`,
        order_id: transactionId,
        user_id: user,
        product_id: cart.product_id,
        quantity: cart.quantity.toString(),
        payment_link: result.redirect_url,
        payment_token: result.token,
        // get the date 7 hours and time zone +8
        expire_at: DateTime.now().plus({ hours: 7 }).setZone('Asia/Makassar').toISO()!,
      })
    }

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: result,
    })
  }
}
