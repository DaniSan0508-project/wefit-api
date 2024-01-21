import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('legal_entities', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('state').notNullable();
    table.string('cnpj').unique().nullable();
    table.string('telephone');
    table.string('email').notNullable();
    table.string('zipCode').notNullable();
    table.string('address').notNullable();
    table.string('number').notNullable();
    table.string('complement');
    table.string('city').notNullable();
    table.string('district').notNullable();
    table.boolean('acceptTerms').defaultTo(false).notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('legal_entities');
}

