import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare transaction_id: string

  @column()
  declare order_id: string

  @column()
  declare user_id: string

  @column()
  declare product_id: string

  @column()
  declare quantity: string

  @column()
  declare payment_link: string

  @column()
  declare payment_token: string

  @column()
  declare expire_at: string

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
