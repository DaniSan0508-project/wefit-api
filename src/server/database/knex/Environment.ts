import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    port: Number(process.env.MYSQLDB_PORT),
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
};