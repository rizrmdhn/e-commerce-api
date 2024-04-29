import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('transaction_id', 255).primary().notNullable()
      table.string('order_id', 255).notNullable()
      table.string('user_id', 255).notNullable()
      table.string('product_id', 255).notNullable()
      table.string('quantity').notNullable()
      table.string('payment_link', 255).notNullable()
      table.string('payment_token', 255).notNullable()

      table.string('expire_at', 255).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index(['transaction_id'], 'transaction_id_index')
      table.index(['order_id'], 'transaction_order_id_index')
      table.index(['user_id'], 'transaction_user_id_index')
      table.index(['product_id'], 'transaction_product_id_index')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
