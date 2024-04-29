import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('product_id', 255).primary()
      table.string('title', 255).notNullable()
      table.string('description', 1000).notNullable()
      table.string('price', 255).notNullable()
      table.string('image', 255).notNullable()
      table.string('category', 255).notNullable()
      table.integer('stock', 255).notNullable().defaultTo('0')
      table.string('rate', 255).notNullable().defaultTo('0')
      table.string('count', 255).notNullable().defaultTo('0')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index(['product_id'], 'product_id_index')
      table.index(['title'], 'product_title_index')
      table.index(['price'], 'product_price_index')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
