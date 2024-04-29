import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Product.all()

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: products,
    })
  }

  async show({ params, response }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.notFound({
        meta: {
          status: 404,
          message: 'Product not found',
        },
      })
    }

    return response.ok({
      meta: {
        status: 200,
        message: 'Success',
      },
      data: product,
    })
  }
}
