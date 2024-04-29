import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ProductJson from '../../data/product.json' with { type: 'json' }
import Product from '../../app/models/product.js'
import * as nanoid from 'nanoid'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    const products = ProductJson.products

    for (const product of products) {
      const newProduct = new Product()
      newProduct.product_id = `product_${nanoid.nanoid(16)}`
      newProduct.title = product.title
      newProduct.price = product.price.toString()
      newProduct.description = product.description
      newProduct.category = product.category
      newProduct.image = product.image
      newProduct.rate = product.rating.rate.toString()
      newProduct.count = product.rating.count.toString()
      newProduct.stock = Math.floor(Math.random() * 10)
      await newProduct.save()
    }
  }
}
