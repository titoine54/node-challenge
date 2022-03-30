import config from 'config';
import { DataSource } from 'typeorm';
import { Expenses } from '../domains/expense/entities/Expenses';
import { Users } from '../domains/user/entities/Users';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: [Expenses,Users],
  logging: false,
});

// eslint-disable-next-line no-console
AppDataSource.initialize().then(() => {}).catch((error) => console.log(error));
