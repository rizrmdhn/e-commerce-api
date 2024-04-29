import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'carts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('cart_id', 255).primary().notNullable()
      table.string('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .string('product_id', 255)
        .unsigned()
        .references('product_id')
        .inTable('products')
        .onDelete('CASCADE')
      table.integer('quantity').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index(['cart_id'], 'cart_id_index')
      table.index(['user_id'], 'cart_users_id_index')
      table.index(['product_id'], 'cart_product_id_index')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
