import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'senha_root_123',
    database: 'wefit',
    port: 3306,
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
};