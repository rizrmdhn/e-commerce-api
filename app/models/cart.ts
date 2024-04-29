import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  declare cart_id: string

  @column()
  declare user_id: string

  @column()
  declare product_id: string

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Product, {
    localKey: 'product_id',
    foreignKey: 'product_id',
  })
  declare product: HasOne<typeof Product>

  @hasOne(() => User, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  declare user: HasOne<typeof User>
}
