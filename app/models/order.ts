import { DateTime } from 'luxon'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, hasOne } from '@adonisjs/lucid/orm'
import Product from './product.js'
import User from './user.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare order_id: string

  @column()
  declare product_id: string

  @column()
  declare user_id: string

  @column()
  declare quantity: number

  @column()
  declare total_price: string

  @column()
  declare status: 'pending' | 'completed' | 'cancelled'

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
