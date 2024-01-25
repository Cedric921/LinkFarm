import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('last_name').nullable()
      table.string('email', 255).nullable().unique()

      table.string('country_code', 5).notNullable().defaultTo('250')
      table.string('number', 15).nullable()
      table.string('password', 180).notNullable()

      table.boolean('status').defaultTo(true)
      table.string('profile').nullable()
      table.string('type').defaultTo('USER').notNullable()
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
