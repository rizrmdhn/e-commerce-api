import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare product_id: string

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare price: string

  @column()
  declare image: string

  @column()
  declare category: string

  @column()
  declare stock: number

  @column()
  declare rate: string

  @column()
  declare count: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
