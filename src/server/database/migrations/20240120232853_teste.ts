import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex
    .schema
    .createTable('profile', table => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 150).index().notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('profile');
}

